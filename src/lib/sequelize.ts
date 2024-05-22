import { Sequelize } from 'sequelize';
import { env } from '../env';

export const sequelize = new Sequelize(env.DATABASE_URL, {
  logging: env.NODE_ENV === 'dev' ? console.log : false,
  timezone: '-03:00',
});
