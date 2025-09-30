import Image from "next/image";
import Link from "next/link";

const OneOrderPage = () => {
  const order = {
    id: "123456",
    date: "29/09/2025",
    total: "120€",
    status: "Terminée",
    products: [
      {
        name: "Chêne pédonculé",
        quantity: 2,
        price: "50€",
        image: "/testcard1.webp",
      },
      {
        name: "Érable champêtre",
        quantity: 1,
        price: "20€",
        image: "/testcard2.webp",
      },
    ],
  };

  return (
    <main className="min-h-screen mt-16 mb-16 px-16 custom-size-minmax py-8 md:py-8">
      {/* Header */}
      <Link
        href="/profil/orders"
        className="inline-flex items-center text-brand-lightgreen hover:text-brand-darkgreen mb-6 text-sm"
      >
        ← Mes commandes
      </Link>

      <h1 className="text-xl md:text-2xl text-brand-darkgreen font-bold mb-2">
        Commande #{order.id}
      </h1>
      <p className="text-brand-green mb-6 md:mb-8 text-sm">
        {order.date} •{" "}
        <span
          className={`${
            order.status === "Terminée" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {order.status}
        </span>
      </p>

      {/* Produits */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl text-brand-darkgreen font-semibold mb-4">
          Articles achetés
        </h2>

        <div className="space-y-4">
          {order.products.map((product, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-4 border border-brand-lightgreen/20 rounded-lg"
            >
              <div className="flex items-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={70}
                  height={70}
                  className="rounded-md mr-4"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-brand-darkgreen font-semibold text-sm md:text-base truncate">
                  {product.name}
                </p>
                <p className="text-brand-green text-sm">
                  Quantité : {product.quantity}
                </p>
              </div>

              <p className="text-brand-darkgreen font-semibold text-base flex-shrink-0">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Total */}
      <div className="flex justify-between items-center p-4 border-t border-brand-lightgreen/20">
        <p className="text-brand-darkgreen font-bold text-lg">Total</p>
        <p className="text-brand-darkgreen font-bold text-xl">{order.total}</p>
      </div>

      {/* Bouton */}
      <div className="text-center mt-8">
        <Link
          href="/profil/orders"
          className="inline-block bg-brand-green hover:bg-brand-darkgreen text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Retour aux commandes
        </Link>
      </div>
    </main>
  );
};

export default OneOrderPage;
