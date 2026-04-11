import type { NextAuthConfig } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("triggering authorized...")
      const isLoggedIn = !!auth?.user;
      const isOnReview = nextUrl.pathname.startsWith('/complaint') || nextUrl.pathname.includes("/complaint")

      const isOnLogIn = nextUrl.pathname.startsWith('/login')
      if (isOnReview) {
        console.log("isOnDashboard")
        if (isLoggedIn) 
          {
            console.log("...and isLoggedin")
            return true;}
        return false; // Redirect unauthenticated users to login page
      } 
      
      else if (isLoggedIn && isOnLogIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;