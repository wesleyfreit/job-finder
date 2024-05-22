import { Router } from 'express';
import { register } from './register-controller';

const router = Router();

router.post('/register', register);

export { router };
