import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
import { headers } from "next/headers";
import CitySelector from "@/components/edit-profile-section/city-state/CityStateSelectionForm";

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const createAccount = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const displayName = formData.get("displayName") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const userType = formData.get("userType") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          name: displayName,
          state: state,
          city: city,
          vendor: userType === "vendor" ? true : false,
        },
      },
    });

    if (error) {
      console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 bg-gray-900 h-screen">
      <Link
        href="/"
        className="transition duration-500 linear absolute left-4 top-8 py-1 px-2 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <form className="flex flex-col w-full max-w-md text-foreground">
        <h2 className="mx-auto text-3xl text-center text-[#663399] mt-10 mb-4">
          Create an account
        </h2>
        <CitySelector />
        <div className="my-2">
          <label htmlFor="userType">Which type of user are you?</label>
          <select  id="state" className="text-black w-9/12 rounded-md mb-2" name="userType" required>
            <option key="customer" value="customer">
              Customer
            </option>
            <option key="vendor" value="vender">
              Vendor
            </option>
          </select>
        </div>
        <label className="text-md" htmlFor="displayName">
          Display Name
        </label>
        <input
          className="rounded-md px-2 py-1 bg-inherit border mb-2"
          name="displayName"
          placeholder="Display name"
          required
        />
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-2 py-1 bg-inherit border mb-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-2 py-1 bg-inherit border mb-4"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={createAccount}
          className="transition duration-300 linear bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <div className="mx-auto mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-[#663399] underline">
          Sign in
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
