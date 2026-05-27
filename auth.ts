import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim())

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return adminEmails.includes(user.email || '')
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
})
