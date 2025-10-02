import { getOneProductWithLocation } from "@/services/product.api";
import PageClient from "./pageClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = await getOneProductWithLocation(Number(id));
  return product ? (
    <PageClient product={product} />
  ) : (
    <p>Produit indisponibles</p>
  );
}
