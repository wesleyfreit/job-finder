import connectSessionSequelize from 'connect-session-sequelize';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import { router as usersRoutes } from './controllers/users/routes';
import { env } from './env';
import { sequelize } from './lib/sequelize';

const app = express();

const port = env.PORT;

const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 7 * 24 * 60 * 60 * 1000,
  checkExpirationInterval: 15 * 60 * 1000,
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: sessionStore,
    secret: env.SESSION_SECRET,
    name: '@job-finder:session',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  }),
);

sessionStore.sync();

app.use(cookieParser());

app.use(usersRoutes);

app.get('/', (_req, res) => res.render('home'));

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
