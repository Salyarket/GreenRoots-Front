export default function CheckoutCancelPage() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-red-100 px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4 text-red-600">Paiement Annulé</h1>
                <p className="text-gray-700 mb-6">
                    Votre paiement a été annulé. Vous pouvez rééssayer ou contacter le support si vous avez besoin d&aposaide.
                </p>
            </div>
        </main>
    );
}