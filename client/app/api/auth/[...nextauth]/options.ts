import GoogleProvider from "next-auth/providers/google"
import { supabase } from "@/lib/initSupabase"

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile)

        let userRole = "Google User"
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        }
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "dark",
    brandColor: "#A400  F1",
    logo: "https://i.ibb.co/8sHv5w5/canute-logo-textless.png",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) session.user.role = token.role
      return session
    },
    async signIn({ user, account }: { user: any; account: any }) {
      const { name, email } = user
      const { data: users } = await supabase
        .from('users')
        .select("*")
        .eq("email", email);
      const userExists = users && users.length !== 0 ? true : false;
      if (!userExists) {

        const userDetails = {
          username: name,
          email: email,
        }
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
        const create_user_url = "http://localhost:8000/users/new"
        try {
          // connect to psql
          // check if user exists
          const response = await fetch(create_user_url, options)
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText)
          }
          const response_json = await response.json()
          console.log(
            "========================================",
            response_json,
            user
          )

          // if (!userExists) {
          // register a new user
          // }
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log("User", email, "has already been registered! Logging in instead!")
      }
      return user
    },
  },
}
