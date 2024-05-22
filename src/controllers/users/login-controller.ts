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
      expiresIn: '1h',
      subject: user.dataValues.id,
    });

    return res.status(200).send({
      user: {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
      },
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).send({ error: error.message });
    }

    throw error;
  }
};
