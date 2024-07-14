export default async function Error() {

    return(
        <div className="flex flex-col justify-evenly bg-gray-900 h-screen items-center content-center text-center">
            <h2 className="text-red-500 text-3xl font-semibold">Oh no... Something seems to have gone wrong!</h2>
            <p className="text-xl font-semibold">Please note: you must wait 15 seconds before attempting to send another reset link</p>
            <p className="text-xl font-semibold">Head back and try again</p>
            <a href="/password-reset" className="border-2 bg-gray-800 hover:bg-gray-900 hover:border-btn-background rounded-md p-2">Go back</a>
        </div>
    )
}