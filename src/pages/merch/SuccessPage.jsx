
export const SuccessPage = () => {
    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-semibold text-green-600 mb-4">Thanks for your order!</h2>
                    <p className="text-lg md:text-3xl text-gray-700">
                        You'll receive a confirmation email shortly!
                    </p>
                </div>
            </div>
        </>
    )
}
