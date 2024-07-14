import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "../login/submit-button";
import { redirect } from "next/navigation";
import PageBackButton from "@/components/PageBackButton";
import { headers } from "next/headers";

export default function ForgotPassword() {

  const handlePasswordReset = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/password-reset/update-password`,
    });
    
    if (error) {
      redirect("/password-reset/error");
    }
    redirect("/password-reset/success")
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 bg-gray-900 h-screen" id="password-reset">
      <PageBackButton text="Back to sign in" href="/login" />
      <form
        className="flex flex-col justify-evenly h-64 md:w-full max-w-md text-foreground"
      >
        <h2 className="mx-auto text-3xl text-center text-3xl font-semibold text-white">
          Reset Password
        </h2>
        <div className="flex flex-col">
          <label className="text-md" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-md p-1 bg-inherit border"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <SubmitButton
          formAction={handlePasswordReset}
          className="transition duration-300 linear bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Sending email..."
        >
          Send Reset Link
        </SubmitButton>
      </form>
    </div>
  );
}
