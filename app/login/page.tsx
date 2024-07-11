import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import PageBackButton from "@/components/PageBackButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 py-8 bg-gray-900">
      <PageBackButton text="Back to landing" href="/"/>
      <form className="flex flex-col w-full max-w-md gap-6 text-foreground">
        <h2 className="mx-auto text-4xl text-center text-[#663399]">Sign in to your account</h2>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="transition duration-300 linear bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <div className="mx-auto">
          No account?{" "}
          <a href="/signup" className="text-[#663399] underline">
          Create an account
          </a>
        </div>
        <div className="mx-auto">
          Forgot password?{" "}
          <a href="/password-reset" className="text-[#663399] underline">
          Reset your password
          </a>
        </div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
