import { Sequelize } from 'sequelize';
import { env } from '../env';

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  logging: env.NODE_ENV === 'dev' ? console.log : false,
});
