import { Router } from 'express';
import { login } from './login-controller';
import { register } from './register-controller';

export const router = Router();

router.get('/login', (_req, res) => res.render('auth/login'));

router.get('/register', (_req, res) => res.render('auth/register'));

router.post('/users', register);

router.post('/sessions', login);
