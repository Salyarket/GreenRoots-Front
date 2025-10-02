// produit
import { create } from "zustand";
import { persist } from "zustand/middleware";

// -> id / prix / nom / quantité
interface Item {
  id: number;
  price: any;
  name: string;
  quantity: number;
  image_urls: string[];
}

// panier
// -> ajouter / supprimer / avoir le total / (mettre à jour)
interface Cart {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: number) => void;
  update: (id: number, quantity: number) => void;
  getTotal: () => number;
}

const useCartStore = create<Cart>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const searchitem = get().items.find((i) => i.id === item.id);
        if (searchitem) {
          set({
            //avec Map on parcourt les éléments du tableau, i c'est un item qui représente le produit pendant l'itération
            items: get().items.map((i) =>
              i.id === item.id
                ? // avec ... on prend toutes les propriétés de i
                  { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      // state : état actuel du panier
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      update: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? // avec ... on prend toutes les propriétés de i
                { ...i, quantity: Math.max(0, quantity) }
              : i
          ),
        })),

      // reduce : réduire le tableau à une seule valeur
      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
