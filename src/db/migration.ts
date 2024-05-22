import { sequelize } from '../lib/sequelize';
import '../models/job';
import '../models/user';

sequelize.sync({ force: false });
