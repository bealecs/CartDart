export default function Success() {
  return (
    <div className=" bg-gray-900 h-screen items-center content-center text-center">
      <h2 className="text-green-500 text-3xl font-semibold">Success!</h2>
      <div className="lg:w-5/12 w-10/12 text-xl mx-auto my-16 font-semibold flex flex-col justify-evenly h-[50%]">
        <p>
          An email has been sent to you with a link to reset your password. You
          will be redirected to update your password from your new link.
        </p>
        <p>
          Please note that it may take up to several minutes for the email to
          arrive to you.
        </p>
        <p>
          If you have not received your email after several minutes, check your
          spam folder.
        </p>
      </div>
      <p className="text-xl text-btn-background font-semibold">You may close this window</p>
    </div>
  );
}
