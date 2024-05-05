import { NextApiRequest } from 'next';
import { cookies, headers } from 'next/headers';
import { JWT, getToken } from 'next-auth/jwt';
import { Session, User, getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const getSession = async (): Promise<Session | null> => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession();

    if (!session) {
      return null;
    }

    return session.user;
  } catch (error) {
    return null;
  }
};

export const getTokenWorkaround = async (): Promise<JWT | null> => {
  const req = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map(c => [c.name, c.value]),
    ),
  } as NextApiRequest;

  return await getToken({ req });
};
