import Link from "next/link";

const Page = async () => {
  return (
    <main className="min-h-screen mt-16 px-4 custom-size-minmax">
      <div>Bonjour Admin</div>
      <Link
        href={"/admin/utilisateurs"}
        className="flex items-center mb-10 text-brand-lightgreen"
      >
        Gestion des utilisateurs
      </Link>
      <Link
        href={"/admin/commandes"}
        className="flex items-center mb-10 text-brand-lightgreen"
      >
        Gestion des commandes
      </Link>
      <Link
        href={"/admin/produits"}
        className="flex items-center mb-10 text-brand-lightgreen"
      >
        Gestion des produits
      </Link>
    </main>
  );
};

export default Page;
