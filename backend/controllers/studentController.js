import db from '../models/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { deleteFile } from '../middleware/fileUpload.js';

// ES6 module fix za __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JobSeeker = db.JobSeeker;
const User = db.User;

/**
 * Dobijanje profila studenta/alumni-ja (sopstveni profil)
 */
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobSeeker = await JobSeeker.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'profilePicture', 'emailVerified']
        }
      ]
    });

    if (!jobSeeker) {
      return res.status(404).json({
        success: false,
        message: 'Profil nije pronađen.'
      });
    }

    return res.status(200).json({
      success: true,
      data: jobSeeker
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri dobijanju profila.',
      error: error.message
    });
  }
};

/**
 * Ažuriranje profila studenta/alumni-ja
 */
export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, bio, phone, location, skills, experience, education } = req.body;

    const jobSeeker = await JobSeeker.findOne({ where: { userId } });
    const user = await User.findByPk(userId);

    if (!jobSeeker || !user) {
      return res.status(404).json({
        success: false,
        message: 'Profil nije pronađen.'
      });
    }

    // Validacija education polja (mora biti niz)
    if (education && !Array.isArray(education)) {
      return res.status(400).json({
        success: false,
        message: 'Education polje mora biti niz objekata.'
      });
    }

    // Validacija skills polja (mora biti niz)
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills polje mora biti niz.'
      });
    }

    const updateData = {};
    if (bio !== undefined) updateData.bio = bio;
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (skills !== undefined) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (education !== undefined) updateData.education = education;

    await jobSeeker.update(updateData);

    const userUpdateData = {};
    if (firstName !== undefined) userUpdateData.firstName = firstName;
    if (lastName !== undefined) userUpdateData.lastName = lastName;
    if (Object.keys(userUpdateData).length > 0) {
      await user.update(userUpdateData);
    }

    return res.status(200).json({
      success: true,
      message: 'Profil uspešno ažuriran.',
      data: {
        ...jobSeeker.toJSON(),
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
          emailVerified: user.emailVerified
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri ažuriranju profila.',
      error: error.message
    });
  }
};

/**
 * Upload profilne slike korisnika (student/alumni)
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Niste priložili sliku.'
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Profil nije pronađen.'
      });
    }

    if (user.profilePicture) {
      const oldPath = path.join(__dirname, '..', user.profilePicture);
      deleteFile(oldPath);
    }

    const profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
    await user.update({ profilePicture });

    return res.status(200).json({
      success: true,
      message: 'Profilna slika uspešno ažurirana.',
      data: { profilePicture }
    });
  } catch (error) {
    console.error('Upload profile picture error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri uploadu slike.',
      error: error.message
    });
  }
};

/**
 * Upload CV-ja
 */
export const uploadCV = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Niste priložili CV fajl.'
      });
    }

    const jobSeeker = await JobSeeker.findOne({ where: { userId } });

    if (!jobSeeker) {
      return res.status(404).json({
        success: false,
        message: 'Profil nije pronađen.'
      });
    }

    // Brisanje starog CV-ja ako postoji
    if (jobSeeker.cv_url) {
      const oldCvPath = path.join(__dirname, '..', jobSeeker.cv_url);
      deleteFile(oldCvPath);
    }

    // Čuvanje novog CV-ja
    const cv_url = `/uploads/cvs/${req.file.filename}`;
    const cv_filename = req.file.originalname;
    const cv_uploadedAt = new Date();

    await jobSeeker.update({
      cv_url,
      cv_filename,
      cv_uploadedAt,
      resume: cv_url // Takođe ažuriramo staro 'resume' polje za kompatibilnost
    });

    return res.status(200).json({
      success: true,
      message: 'CV uspešno uploadovan.',
      data: {
        cv_url,
        cv_filename,
        cv_uploadedAt
      }
    });
  } catch (error) {
    console.error('Upload CV error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri uploadu CV-ja.',
      error: error.message
    });
  }
};

/**
 * Download CV-ja
 */
export const downloadCV = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobSeeker = await JobSeeker.findOne({ where: { userId } });

    if (!jobSeeker || !jobSeeker.cv_url) {
      return res.status(404).json({
        success: false,
        message: 'CV nije pronađen.'
      });
    }

    const cvPath = path.join(__dirname, '..', jobSeeker.cv_url);

    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({
        success: false,
        message: 'CV fajl ne postoji na serveru.'
      });
    }

    // Postavljanje headera za download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${jobSeeker.cv_filename}"`);

    return res.download(cvPath, jobSeeker.cv_filename);
  } catch (error) {
    console.error('Download CV error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri preuzimanju CV-ja.',
      error: error.message
    });
  }
};

/**
 * Brisanje CV-ja
 */
export const deleteCV = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobSeeker = await JobSeeker.findOne({ where: { userId } });

    if (!jobSeeker) {
      return res.status(404).json({
        success: false,
        message: 'Profil nije pronađen.'
      });
    }

    if (!jobSeeker.cv_url) {
      return res.status(404).json({
        success: false,
        message: 'Nemate uploadovan CV.'
      });
    }

    // Brisanje fajla sa servera
    const cvPath = path.join(__dirname, '..', jobSeeker.cv_url);
    deleteFile(cvPath);

    // Brisanje iz baze
    await jobSeeker.update({
      cv_url: null,
      cv_filename: null,
      cv_uploadedAt: null,
      resume: null
    });

    return res.status(200).json({
      success: true,
      message: 'CV uspešno obrisan.'
    });
  } catch (error) {
    console.error('Delete CV error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri brisanju CV-ja.',
      error: error.message
    });
  }
};

/**
 * Javni profil studenta (za kompanije)
 */
export const getPublicProfile = async (req, res) => {
  try {
    const { jobSeekerId } = req.params;

    const jobSeeker = await JobSeeker.findByPk(jobSeekerId, {
      attributes: ['id', 'bio', 'location', 'skills', 'experience', 'education', 'cv_filename', 'cv_uploadedAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'role', 'profilePicture']
        }
      ]
    });

    if (!jobSeeker) {
      return res.status(404).json({
        success: false,
        message: 'Profil nije pronađen.'
      });
    }

    return res.status(200).json({
      success: true,
      data: jobSeeker
    });
  } catch (error) {
    console.error('Get public profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Greška pri dobijanju profila.',
      error: error.message
    });
  }
};

export default {
  getMyProfile,
  updateMyProfile,
  uploadCV,
  downloadCV,
  deleteCV,
  getPublicProfile
};
