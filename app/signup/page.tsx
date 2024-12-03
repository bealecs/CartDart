import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../login/submit-button";
import CitySelector from "@/components/edit-profile-section/city-state/CityStateSelectionForm";
import PageBackButton from "@/components/PageBackButton";
import { headers } from "next/headers";

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
      <PageBackButton text="Back to landing" href="/" />
      <form className="flex flex-col justify-evenly my-8 h-full md:w-full max-w-md text-foreground">
        <h2 className="mx-auto text-3xl text-center text-[#663399] mt-10 mb-4">
          Create an account
        </h2>
        <CitySelector />
        <div className="my-2">
          <label htmlFor="userType">Which type of user are you?:</label>
          <select
            id="state"
            className="text-black p-2 w-full md:w-8/12 rounded-md mb-2 focus:ring-2 focus:ring-blue-500"
            name="userType"
            required
          >
            <option key="customer" value="customer">
              Customer
            </option>
            <option key="vendor" value="vender">
              Vendor
            </option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-md" htmlFor="displayName">
            Display Name:
          </label>
          <input
            className="rounded-md p-1 bg-inherit border focus:ring-2 focus:ring-blue-500"
            name="displayName"
            placeholder="Display name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-md p-1 bg-inherit border focus:ring-2 focus:ring-blue-500"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded-md p-1 bg-inherit border focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            placeholder="••••••••••••••••"
            required
          />
        </div>
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
