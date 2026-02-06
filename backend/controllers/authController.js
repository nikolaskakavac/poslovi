import db from '../models/index.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { 
  generateToken as generateEmailToken, 
  sendVerificationEmail, 
  sendPasswordResetEmail,
  sendPasswordChangeConfirmation 
} from '../utils/emailService.js';

const User = db.User;

/**
 * Registracija novog korisnika
 * Kreira User sa odgovarajućom ulogom i šalje verifikacioni email
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validacija dozvoljenih uloga
    const allowedRoles = ['student', 'alumni', 'company', 'admin'];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Nevažeća uloga. Dozvoljene uloge: ${allowedRoles.join(', ')}`
      });
    }

    // Provera da li korisnik već postoji
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Korisnik sa ovom email adresom već postoji.'
      });
    }

    // Hash lozinke
    const hashedPassword = hashPassword(password);

    // Generisanje email verifikacijskog tokena
    const emailVerificationToken = generateEmailToken();

    // Kreiranje korisnika
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'student',
      emailVerificationToken,
      emailVerified: false
    });

    // Kreiranje odgovarajućeg profila na osnovu uloge
    if (newUser.role === 'student' || newUser.role === 'alumni') {
      await db.JobSeeker.create({ 
        userId: newUser.id,
        bio: null,
        phone: null,
        location: null,
        education: []
      });
    } else if (newUser.role === 'company') {
      await db.Company.create({
        userId: newUser.id,
        companyName: `${firstName} ${lastName} Company`,
        description: null,
        industry: null,
        location: null
      });
    }

    // Slanje verifikacijskog emaila
    try {
      await sendVerificationEmail(email, emailVerificationToken, firstName);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Nastavljamo sa registracijom čak i ako email ne uspe
    }

    // Generisanje JWT tokena
    const token = generateToken(newUser.id, newUser.email, newUser.role);

    return res.status(201).json({
      success: true,
      message: 'Registracija uspešna! Proverite email za verifikaciju.',
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        emailVerified: newUser.emailVerified,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri registraciji.',
      error: error.message
    });
  }
};

/**
 * Login korisnika
 * Proverava kredencijale i vraća JWT token
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Pronalaženje korisnika po email-u
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Nevažeća email adresa ili lozinka.'
      });
    }

    // Provera lozinke
    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Nevažeća email adresa ili lozinka.'
      });
    }

    // Provera da li je nalog aktivan
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Vaš nalog je deaktiviran. Kontaktirajte administratora.'
      });
    }

    // Upozorenje ako email nije verifikovan (opciono - ne blokira login)
    const emailWarning = !user.emailVerified 
      ? 'Vaš email nije verifikovan. Proverite inbox za verifikacioni link.' 
      : null;

    // Ažuriranje lastLogin vremena
    await user.update({ lastLogin: new Date() });

    // Generisanje JWT tokena
    const token = generateToken(user.id, user.email, user.role);

    return res.status(200).json({
      success: true,
      message: 'Login uspešan!',
      warning: emailWarning,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        profilePicture: user.profilePicture,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri logovanju.',
      error: error.message
    });
  }
};

/**
 * Verifikacija email adrese
 * Proverava token i aktivira nalog
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verifikacioni token je obavezan.'
      });
    }

    // Pronalaženje korisnika sa ovim tokenom
    const user = await User.findOne({ 
      where: { emailVerificationToken: token } 
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Nevažeći ili istekli verifikacioni token.'
      });
    }

    // Provera da li je već verifikovan
    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email je već verifikovan.'
      });
    }

    // Verifikacija emaila
    await user.update({
      emailVerified: true,
      emailVerificationToken: null
    });

    return res.status(200).json({
      success: true,
      message: 'Email uspešno verifikovan! Možete se prijaviti.'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri verifikaciji emaila.',
      error: error.message
    });
  }
};

/**
 * Zahtev za resetovanje lozinke
 * Generiše reset token i šalje email
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email adresa je obavezna.'
      });
    }

    // Pronalaženje korisnika
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Iz bezbednosnih razloga, ne otkrivamo da li email postoji
      return res.status(200).json({
        success: true,
        message: 'Ako nalog sa ovim emailom postoji, poslaćemo instrukcije za reset lozinke.'
      });
    }

    // Generisanje reset tokena koji ističe za 1 sat
    const resetToken = generateEmailToken();
    const resetExpires = new Date(Date.now() + 3600000); // 1 sat

    await user.update({
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires
    });

    // Slanje reset emaila
    try {
      await sendPasswordResetEmail(email, resetToken, user.firstName);
    } catch (emailError) {
      console.error('Password reset email failed:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Greška pri slanju emaila. Pokušajte ponovo.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Instrukcije za reset lozinke su poslate na vaš email.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri obradi zahteva.',
      error: error.message
    });
  }
};

/**
 * Resetovanje lozinke sa tokenom
 * Proverava token i postavlja novu lozinku
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token i nova lozinka su obavezni.'
      });
    }

    // Validacija nove lozinke
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Nova lozinka mora imati najmanje 6 karaktera.'
      });
    }

    // Pronalaženje korisnika sa validnim reset tokenom
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          [db.Sequelize.Op.gt]: new Date() // Token nije istekao
        }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Nevažeći ili istekli reset token.'
      });
    }

    // Hash nove lozinke
    const hashedPassword = hashPassword(newPassword);

    // Ažuriranje lozinke i brisanje reset tokena
    await user.update({
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null
    });

    // Slanje potvrde o promeni lozinke
    try {
      await sendPasswordChangeConfirmation(user.email, user.firstName);
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError);
      // Nastavljamo čak i ako confirmation email ne uspe
    }

    return res.status(200).json({
      success: true,
      message: 'Lozinka uspešno promenjena! Možete se prijaviti sa novom lozinkom.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri resetovanju lozinke.',
      error: error.message
    });
  }
};

/**
 * Ponovno slanje verifikacijskog emaila
 */
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Korisnik sa ovim emailom ne postoji.'
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email je već verifikovan.'
      });
    }

    // Generisanje novog tokena
    const newToken = generateEmailToken();
    await user.update({ emailVerificationToken: newToken });

    // Slanje emaila
    await sendVerificationEmail(email, newToken, user.firstName);

    return res.status(200).json({
      success: true,
      message: 'Verifikacioni email ponovno poslat.'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri slanju emaila.',
      error: error.message
    });
  }
};

/**
 * Logout korisnika (client-side će obrisati token)
 */
export const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Uspešno ste se odjavili.'
  });
};

/**
 * Dobijanje trenutno ulogovanog korisnika sa profilom
 */
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'emailVerificationToken', 'passwordResetToken'] },
      include: [
        {
          model: db.JobSeeker,
          as: 'jobSeeker',
          required: false
        },
        {
          model: db.Company,
          as: 'company',
          required: false
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Korisnik nije pronađen.'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri dobijanju profila korisnika.',
      error: error.message
    });
  }
};

export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
  logout,
  getCurrentUser
};
