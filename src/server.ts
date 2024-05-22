import express from 'express';
import { env } from './env';
import { sequelize } from './lib/sequelize';

const app = express();

const port = env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
