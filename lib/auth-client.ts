import { createAuthClient } from "better-auth/react"
import { adminClient, usernameClient } from "better-auth/client/plugins"

export const { signIn, signUp, signOut, useSession } = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        adminClient(),
        usernameClient(),
    ]
});