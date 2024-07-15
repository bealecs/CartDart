import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default function UpdatePassword() {
 
  const handleUpdatePassword = async (formData: FormData) => {
    "use server";

    const password1 = formData.get("password1") as string;
    const password2 = formData.get("password2") as string;
    const supabase = createClient();

    if (password1 !== password2) {
        alert("Passwords do not match");
        return;
    }

    console.log("attempting to update password")
    const { error } = await supabase.auth.updateUser({
        password: password1,
      });

    if (error) {
      console.log(error);
      return;
    }
    console.log("Password reset")
    redirect(`${process.env.VERCEL_URL}/dashboard`); 
  };


  return (
    <div className="flex flex-col items-center justify-center px-4 bg-gray-900 h-screen">
      <form
        action={handleUpdatePassword}
        className="flex flex-col justify-evenly my-8 h-full md:w-full max-w-md text-foreground"
      >
        <h2 className="mx-auto text-3xl text-center text-[#663399] mt-10 mb-4">
          Update Password
        </h2>
        <div className="flex flex-col">
          <label className="text-md" htmlFor="new-password">
            New Password:
          </label>
          <input
            className="rounded-md p-1 bg-inherit border"
            type="password"
            id="new-password"
            name="password1"
            required
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-md" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <input
            className="rounded-md p-1 bg-inherit border"
            type="password"
            id="confirm-password"
            name="password2"
            required
          />
        </div>
        <button
          type="submit"
          className="transition duration-300 linear bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 text-foreground mb-2 mt-4"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
