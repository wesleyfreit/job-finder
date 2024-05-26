import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../../env';
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error';
import { User } from '../../models/user';

export const login = async (req: Request, res: Response) => {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = loginBodySchema.parse(req.body);

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.dataValues.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({}, env.JWT_SECRET, {
      expiresIn: 3600,
      subject: user.dataValues.id,
    });

    const tokenBearer = `Bearer ${token}`;

    res.cookie('@job-finder:token', tokenBearer, { maxAge: 3600000 });

    res.set('Authorization', tokenBearer);

    req.session.user = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
    };

    req.session.save((err) => {
      if (err) {
        throw err;
      }

      return res.redirect('/');
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).send({ error: error.message });
    }

    throw error;
  }
};
