import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import databaseConfig from '../config/database.js';

import UserModel from './User.js';
import JobSeekerModel from './JobSeeker.js';
import CompanyModel from './Company.js';
import JobModel from './Job.js';
import ApplicationModel from './Application.js';
import ReviewModel from './Review.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: config.logging
});

const db = {};

// Import models
db.User = UserModel(sequelize);
db.JobSeeker = JobSeekerModel(sequelize);
db.Company = CompanyModel(sequelize);
db.Job = JobModel(sequelize);
db.Application = ApplicationModel(sequelize);
db.Review = ReviewModel(sequelize);

// Define associations
// User associations
db.User.hasOne(db.JobSeeker, { foreignKey: 'userId', as: 'jobSeeker', onDelete: 'CASCADE' });
db.User.hasOne(db.Company, { foreignKey: 'userId', as: 'company', onDelete: 'CASCADE' });

// JobSeeker associations
db.JobSeeker.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.JobSeeker.hasMany(db.Application, { foreignKey: 'jobSeekerId', onDelete: 'CASCADE' });
db.JobSeeker.hasMany(db.Review, { foreignKey: 'jobSeekerId', onDelete: 'CASCADE' });

// Company associations
db.Company.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
db.Company.hasMany(db.Job, { foreignKey: 'companyId', onDelete: 'CASCADE' });
db.Company.hasMany(db.Review, { foreignKey: 'companyId', onDelete: 'CASCADE' });

// Job associations
db.Job.belongsTo(db.Company, { foreignKey: 'companyId', as: 'company' });
db.Job.hasMany(db.Application, { foreignKey: 'jobId', onDelete: 'CASCADE' });

// Application associations
db.Application.belongsTo(db.Job, { foreignKey: 'jobId', as: 'job' });
db.Application.belongsTo(db.JobSeeker, { foreignKey: 'jobSeekerId', as: 'jobSeeker' });

// Review associations
db.Review.belongsTo(db.Company, { foreignKey: 'companyId', as: 'company' });
db.Review.belongsTo(db.JobSeeker, { foreignKey: 'jobSeekerId', as: 'jobSeeker' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
