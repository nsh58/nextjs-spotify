import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

// optionally add stronger typing for next-specific implementation
export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse,
) => void | Promise<void>;

const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, {
    cookieName: 'app_session',
    password: `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
  });

export default withSession;