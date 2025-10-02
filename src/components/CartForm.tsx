"use client";

import { useState } from "react";
import Link from "next/link";

import useCartStore from "@/store/CartStore";
import { IProduct } from "@/types/index.types";

interface FormProps {
  price: string;
  stock: number;
  product: IProduct | null;
}

const CartForm = ({ price, stock, product }: FormProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : stock));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10);

    if (isNaN(val)) {
      setQuantity(1);
      return;
    }

    if (val < 1) val = 1;
    if (val > stock) val = stock;

    setQuantity(val);
  };

  const add = useCartStore((state) => state.add);
  if (!product) return <p>Produit indispo</p>;

  return (
    <form className="flex flex-col mt-6">
      <h2 className="text-center font-bold">
        Prix : {quantity * Number(price)} €
      </h2>

      <div className="flex flex-row justify-center items-center space-x-4 mt-2">
        {/* Bouton - */}
        <button
          type="button"
          onClick={handleDecrement}
          className="bg-brand-lightgreen rounded-full w-8 h-8 flex items-center justify-center text-white font-extrabold hover:bg-green-700"
        >
          -
        </button>

        {/* Input quantité */}
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={stock}
          value={quantity}
          onChange={handleChange}
          className="w-20 border rounded px-2 py-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Bouton + */}
        <button
          type="button"
          onClick={handleIncrement}
          className="bg-brand-lightgreen rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold hover:bg-green-700"
        >
          +
        </button>
      </div>

      <div className="w-full flex flex-col">
        <button
          onClick={() =>
            add({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              image_urls: product.image_urls,
            })
          }
          type="submit"
          className="mt-4 mx-auto w-full md:w-2/3 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition hover:cursor-pointer"
        >
          Ajouter au panier
        </button>

        <Link
          href="/panier"
          className="mt-4 mx-auto w-full md:w-2/3 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition text-center"
        >
          Voir le panier
        </Link>
      </div>
    </form>
  );
};

export default CartForm;
