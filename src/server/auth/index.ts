import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins/admin";

import { env } from "~/env";

import { db } from "../db";


export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  plugins: [admin()],
});

export type Session = typeof auth.$Infer.Session;
