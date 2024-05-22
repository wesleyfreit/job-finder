import { Router } from 'express';
import { login } from './login-controller';
import { register } from './register-controller';

const router = Router();

router.post('/users', register);

router.post('/sessions', login);

export { router };
