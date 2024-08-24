
import { signIn } from "@/app/auth"
import { redirect } from "next/navigation"
 
const SignInPage = () => {

  const handleSignIn = async (formData: any) => {
    "use server"
    await signIn("credentials", {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: "/"
    })
    // redirect("")
  }

  return (
    <form
      action={handleSignIn}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}

export default SignInPage