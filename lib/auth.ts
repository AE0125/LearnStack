import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import {admin} from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins"
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  appName: "LearnStack",
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    }
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [
    admin(),
    nextCookies(),
    username(),
  ],
  signIn: {
    onSuccess: async () => {
      redirect("/dashboard");
    },
  },
  user: {
    additionalFields: {
      
    }
  }
});