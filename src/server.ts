import express from 'express';
import { router as usersRoutes } from './controllers/users/routes';
import { env } from './env';

const app = express();

const port = env.PORT;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.static('public'));

app.use(usersRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
