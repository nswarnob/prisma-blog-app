import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      role: {
        type: "string",
        enum: ["user", "admin"],
        default: "user",
      },
      phoneNumber: {
        type: "string",
        required: false,
      },

      status: {
        type: "string",
        enum: ["active", "inactive", "banned"],
        default: "active",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      console.log(" verification email sent to user");
    },
  },
});
