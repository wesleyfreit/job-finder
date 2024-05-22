import express from 'express';
import { env } from './env';
import { router as usersRoutes } from './controllers/users/routes';

const app = express();

const port = env.PORT;

app.use(express.json());

app.use(usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
