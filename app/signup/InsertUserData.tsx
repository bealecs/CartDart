import { createClient } from "@/utils/supabase/client";

// inserts users email and display name into the users table of the db
export const insertUserData = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  //form data will be coming from parent component (sign up)
  const email = formData.get("email");
  const displayName = formData.get("displayName");

  console.log("Inserting user data into DB table");

  const { error } = await supabase
    .from("users")
    .insert({ email: email, name: displayName });

  if (error) {
    console.log(
      "The system was unable to insert user values into DB table:",
      error
    );
  }
  console.log("End of Insertion operation");
};
