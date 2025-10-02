import { getOneProductWithLocation } from "@/services/api";
import PageClient from "./pageClient";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = await getOneProductWithLocation(Number(id));
  return product ? <PageClient product={product} /> : <p>Produit indispo</p>;
}
