/**
 * ╔════════════════════════════════════════════════════════════════╗
 * ║                   MASTER ARCHITECTURE GUIDE                    ║
 * ║             Sveobuhvatnog pregled svega što postoji            ║
 * ╚════════════════════════════════════════════════════════════════╝
 * 
 * STRUKTURA JOBZEE BACKEND-a
 * ============================
 * 
 * SASTAVNI DELOVI:
 * 1. MODELS - Sve tabele baze podataka
 * 2. CONTROLLERS - Sva poslovna logika
 * 3. MIGRATIONS - Sve izmene baze podataka
 * 4. ROUTES - Sve API routes/endpoint-i
 * 5. MIDDLEWARE - Autentifikacija, validacija
 * 6. UTILS - Pomoćne funkcije (JWT, email, lozinka)
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ DELI 1: MODELS (6 modela + 1 master guide)                    ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * DOSTUPNI MODELI:
 * 
 * 1. User
 *    - firstName, lastName, email, password
 *    - role: student, alumni, company, admin
 *    - emailVerified, lastLogin
 *    
 * 2. JobSeeker
 *    - bio, phone, location, skills, education
 *    - cvPath, yearsOfExperience
 *    - Relacija: hasMany Applications, hasMany Reviews
 *    
 * 3. Company
 *    - companyName, description, industry
 *    - location, website, logo
 *    - Relacija: hasMany Jobs, hasMany Reviews
 *    
 * 4. Job
 *    - title, description, category, location
 *    - jobType, experienceLevel, salary
 *    - deadline, requiredSkills
 *    - Relacija: hasMany Applications
 *    
 * 5. Application
 *    - status: pending, accepted, rejected
 *    - appliedAt, reviewed, feedback
 *    - Relacija: belongsTo Job, belongsTo JobSeeker
 *    
 * 6. Review
 *    - rating (1-5), comment
 *    - Relacija: belongsTo Company, belongsTo JobSeeker
 * 
 * DOKUMENTACIJA: /backend/models/GUIDE.js
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ DELI 2: CONTROLLERS (7 kontrolera)                            ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * DOSTUPNI KONTROLERI:
 * 
 * 1. authController
 *    - register() - Registracija korisnika
 *    - login() - Login sa JWT tokenima
 *    - logout() - Logout
 *    - verifyEmail() - Verifikacija email-a
 *    - forgotPassword() - Reset lozinke
 *    - resetPassword() - Postavljanje nove lozinke
 *    
 * 2. jobController
 *    - createJob() - Kreiranje oglas (samo company/alumni)
 *    - getJobs() - Prikaz svih oglasa sa filterima
 *    - getJobById() - Prikaz pojednog oglasa
 *    - updateJob() - Ažuriranje oglasa
 *    - deleteJob() - Brisanje oglasa
 *    
 * 3. companyController
 *    - getCompanies() - Sve kompanije
 *    - getCompanyById() - Detalji kompanije
 *    - updateCompany() - Ažuriranje kompanije
 *    
 * 4. studentController
 *    - getProfile() - Student profil
 *    - updateProfile() - Ažuriranje profila
 *    - uploadCV() - Upload CV-a
 *    - downloadCV() - Skidanje CV-a
 *    - deleteCV() - Brisanje CV-a
 *    
 * 5. applicationController
 *    - getApplications() - Sve primene
 *    - applyForJob() - Prijava za posao
 *    - updateApplicationStatus() - Promena statusa (kompanija)
 *    
 * 6. reviewController
 *    - createReview() - Kreiranje recenzije
 *    - getCompanyReviews() - Sve recenzije kompanije
 *    - updateReview() - Ažuriranje recenzije
 *    - deleteReview() - Brisanje recenzije
 *    
 * 7. adminController
 *    - getStats() - Statistika sistema
 *    - getUsers() - Svi korisnici
 *    - deleteUser() - Brisanje korisnika
 * 
 * PRISTUP: import { controllerName } from '../controllers/index.js'
 * DOKUMENTACIJA: /backend/controllers/ (svi fajlovi)
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ DELI 3: MIGRATIONS (6 migracija)                              ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * PRIMENJENE MIGRACIJE:
 * 
 * 1. 001-create-users.js
 *    - Kreira tabelu 'users' sa osnovnim poljima
 *    - PK: id (INTEGER)
 *    - Kolone: firstName, lastName, email, password, role, ...
 *    
 * 2. 002-create-job-seekers-and-companies.js
 *    - Kreira tabele 'jobSeekers' i 'companies'
 *    - FK: userId -> users.id
 *    - jobSeekers: skills, experience, education
 *    - companies: companyName, industry, website
 *    
 * 3. 003-create-jobs-applications-reviews.js
 *    - Kreira tabele 'jobs', 'applications', 'reviews'
 *    - jobs: title, description, salary, deadline
 *    - applications: status (pending/accepted/rejected)
 *    - reviews: rating (1-5), comment
 *    
 * 4. 004-add-last-login-to-users.js
 *    - Dodaje polje 'lastLogin' u users tabelu
 *    
 * 5. 005-modify-companies-table.js
 *    - Modifikuje companies tabelu
 *    
 * 6. 006-update-for-new-requirements.js
 *    - Dodaje nove kolone prema zahtevima
 * 
 * DOKUMENTACIJA: /backend/migrations/SCHEMA.js, /backend/migrations/index.js
 * 
 * AUTOMATSKA PRIMENA:
 *  db.sequelize.sync({ alter: false }) u server.js
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ DELI 4: DATABASE SCHEMA                                       ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * PREGLED BAZE (nakon svih migracija):
 * 
 * Tabele: 6
 *  ✓ users (8 korisnika)
 *  ✓ jobSeekers (student profili, FK: users)
 *  ✓ companies (company profili, FK: users)
 *  ✓ jobs (oglasi za posao, FK: companies)
 *  ✓ applications (primene, FK: jobs + jobSeekers)
 *  ✓ reviews (recenzije, FK: companies + jobSeekers)
 * 
 * Relacije:
 *  User 1 -> 1 JobSeeker
 *  User 1 -> 1 Company
 *  JobSeeker 1 -> * Application
 *  JobSeeker 1 -> * Review
 *  Company 1 -> * Job
 *  Company 1 -> * Review
 *  Job 1 -> * Application
 * 
 * Constraints:
 *  - users.email UNIQUE
 *  - jobSeekers.userId UNIQUE FK
 *  - companies.userId UNIQUE FK
 *  - reviews.rating CHECK (1-5)
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ DELI 5: ROUTES & API ENDPOINTS                                ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * AUTH RUTE (7 endpoint-a)
 *  POST   /api/auth/register
 *  POST   /api/auth/login
 *  POST   /api/auth/logout
 *  POST   /api/auth/verify-email
 *  POST   /api/auth/forgot-password
 *  POST   /api/auth/reset-password
 *  GET    /api/auth/me
 * 
 * JOB RUTE (5 endpoint-a)
 *  GET    /api/jobs (sa filtrima)
 *  GET    /api/jobs/:id
 *  POST   /api/jobs (auth: company, alumni)
 *  PUT    /api/jobs/:id (auth: company owner)
 *  DELETE /api/jobs/:id (auth: company owner)
 * 
 * COMPANY RUTE (3 endpoint-a)
 *  GET    /api/companies
 *  GET    /api/companies/:id
 *  PUT    /api/companies/:id (auth: company owner)
 * 
 * APPLICATION RUTE (3 endpoint-a)
 *  GET    /api/applications
 *  POST   /api/applications/apply/:jobId (auth: student)
 *  PUT    /api/applications/:id (auth: company)
 * 
 * STUDENT RUTE (5 endpoint-a)
 *  GET    /api/student/profile (auth)
 *  PUT    /api/student/profile (auth)
 *  POST   /api/student/upload-cv (auth)
 *  GET    /api/student/download-cv (auth)
 *  DELETE /api/student/delete-cv (auth)
 * 
 * REVIEW RUTE (4 endpoint-a)
 *  POST   /api/reviews (auth)
 *  GET    /api/reviews/company/:id
 *  PUT    /api/reviews/:id (auth: review owner)
 *  DELETE /api/reviews/:id (auth: review owner)
 * 
 * ADMIN RUTE (3 endpoint-a)
 *  GET    /api/admin/stats (auth: admin)
 *  GET    /api/admin/users (auth: admin)
 *  DELETE /api/admin/users/:id (auth: admin)
 * 
 * HEALTH CHECK
 *  GET    /api/health (javno dostupan)
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ DELI 6: MIDDLEWARE & UTILITIES                                ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * MIDDLEWARE:
 * 
 * auth.js
 *  - verifyToken() - Proverava JWT token
 *  - checkRole() - Proverava ulogu korisnika
 *  
 * validation.js
 *  - Validacija input-a (email, lozinka, itd.)
 *  - Express-validator rules
 *  
 * fileUpload.js
 *  - Multer konfiguracija
 *  - Upload CV-a i slika
 * 
 * UTILITIES:
 * 
 * jwt.js
 *  - generateToken() - JWT token generisanje
 *  - verifyToken() - Verifikacija tokena
 *  
 * password.js
 *  - hashPassword() - Bcryptjs hashing
 *  - comparePassword() - Poređenje lozinki
 *  
 * emailService.js
 *  - sendVerificationEmail() - Verifikacija
 *  - sendPasswordResetEmail() - Reset lozinke
 *  - sendPasswordChangeConfirmation() - Potvrda
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ DATA FLOW                                                      ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * PRIMER: Login Korisnika
 * 
 * 1. Client: POST /api/auth/login { email, password }
 * 2. Routes: authRoutes prosleđuje zahtev
 * 3. Controller: authController.login() izvršava logiku
 *    - Pronalazi User po email-u
 *    - Poredi lozinke pomoću password.js
 *    - Generiše JWT token pomoću jwt.js
 * 4. Database: Pronalazi korisnika u users tabeli
 * 5. Response: Vraća { token, user }
 * 6. Client: Čuva token u localStorage
 * 
 * PRIMER: Postavljanje Oglasa
 * 
 * 1. Client: POST /api/jobs (auth header + body)
 * 2. Routes: jobRoutes -> auth middleware proverava token
 * 3. Middleware: Verifikuje JWT i postavlja user u req
 * 4. Controller: jobController.createJob() izvršava logiku
 *    - Pronalazi Company po userId
 *    - Kreira novi Job
 *    - Povezuje Job sa Company-om
 * 5. Database: INSERT novo u jobs tabelu
 * 6. Response: Vraća kreiran Job
 * 7. Client: Prikazuje oglas na stranici
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ KAKO KORISTITI OVU DOKUMENTACIJU                              ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * 1. MODELI - Pogledaj /backend/models/GUIDE.js
 *    Sadrži: Svi modeli, polja, relacije, primeri upita
 *    
 * 2. MIGRACIJE - Pogledaj /backend/migrations/
 *    - index.js: Pregled svih migracija
 *    - SCHEMA.js: Kompletan SQL schema
 *    
 * 3. KONTROLERI - Pogledaj /backend/controllers/
 *    - index.js: Master index sa svim kontrolerima
 *    - Svaki fajl: Detaljne funkcije sa komentarima
 *    
 * 4. RUTE - Pogledaj /backend/routes/
 *    Svaki fajl: Endpoint-i sa auth zahtevima
 *    
 * 5. KOMPLETAN KOD - Pogledaj /backend/
 *    Sve je organizovano po domenama
 */

// ╔════════════════════════════════════════════════════════════════╗
// ║ STATISTIKA                                                    ║
// ╚════════════════════════════════════════════════════════════════╝

/**
 * PROJEKTNA STATISTIKA:
 * 
 * MODELI: 6
 *  - User, JobSeeker, Company, Job, Application, Review
 * 
 * KONTROLERI: 7
 *  - Auth, Job, Company, Student, Application, Review, Admin
 * 
 * RUTE: 7 fajla
 *  - Auth, Job, Company, Student, Application, Review, Admin
 * 
 * ENDPOINT-I: 35+
 *  - 7 auth, 5 job, 3 company, 5 student, 3 application, 4 review, 3 admin, 1 health
 * 
 * MIGRACIJE: 6
 *  - Kuming od empty baze do kompletan schema
 * 
 * MIDDLEWARE: 3
 *  - Authentication, Validation, File Upload
 * 
 * UTILITY FUNKCIJE: 10+
 *  - JWT, Password, Email, itd.
 * 
 * RED LINIJA KODA: 2000+
 * BAZA PODATAKA: 6 tabela, 60+ kolona, 15+ relacija, 10+ constraints
 */

export const ARCHITECTURE = {
  models: 6,
  controllers: 7,
  routes: 7,
  endpoints: 35,
  migrations: 6,
  middleware: 3,
  utilities: 10,
  totalLines: 2000
};

export default ARCHITECTURE;
