import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: 'garbage',
    session: {
        strategy: 'jwt',
        maxAge:3*24*60*60
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Check if credentials are provided
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Find the user by email
                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                });

                // Check if user exists
                if (!existingUser) {
                    return null;
                }

                // Compare the password
                const passwordMatch = await compare(credentials.password, existingUser.password);
                if (!passwordMatch) {
                    return null;
                }

                if (!existingUser.isEnabled) {
                    throw new Error('User account is disabled.');
                }

                return {
                    id: `${existingUser.id}`,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    role: token.role,
                }
            };
        }
    }
};
