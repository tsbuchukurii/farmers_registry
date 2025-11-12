import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import axios from "axios";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    // Call your Python backend login endpoint
                    const response = await axios.post(
                        `${process.env.API_URL}/auth/login`,
                        {
                            email: credentials.email,
                            password: credentials.password
                        },
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    );

                    const user = response.data;

                    // Expected response from backend:
                    // {
                    //   id: "user_id",
                    //   email: "user@example.com",
                    //   name: "John Doe",
                    //   role: "admin" | "user" | "manager",
                    //   accessToken: "jwt_token",
                    //   refreshToken: "refresh_token"
                    // }

                    if (user && user.accessToken) {
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role,
                            accessToken: user.accessToken,
                            refreshToken: user.refreshToken
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error(error.response?.data?.message || "Invalid credentials");
                }
            }
        })
],
    callbacks:{
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            // Update session
            if (trigger === "update" && session) {
                token = { ...token, ...session.user };
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"

}
export const getAuthSession = () => getServerSession(authOptions);

export const hasRole = (session, allowedRoles) => {
    if (!session?.user?.role) return false;
    return allowedRoles.includes(session.user.role);
};
