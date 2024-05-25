import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { z } from 'zod';
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error';
import { User } from '../../models/user';

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const registerBodySchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      confirm_password: z.string().min(6),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: 'Passwords do not match',
      path: ['repeat_password'],
    });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    await User.create({
      name,
      email,
      password_hash,
    });

    return res.status(201).render('login');
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({ error: error.message });
    }

    throw error;
  }
};
