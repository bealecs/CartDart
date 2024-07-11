export default function Success() {

    return(
        <div className="flex flex-col justify-evenly bg-gray-900 h-screen items-center content-center text-center">
            <h2 className="text-green-500 text-3xl font-semibold">Success!</h2>
            <p className="lg:w-5/12 w-10/12 text-xl font-semibold">An email has been sent to you with a link to reset your password. You will be redirected to update your password from your new link.</p>
            <p className="text-xl font-semibold">You may close this window</p>
        </div>
    )
}