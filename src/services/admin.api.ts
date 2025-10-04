import { IProduct, PaginatedResponse } from "@/types/index.types";
import { apiFetch } from "./api";
import { ProductFormData } from "@/lib/validators/productSchema";

// admin (tous les produits, dispo ou pas)
export async function getProductsPaginationAdmin(
  limit: number,
  page: number = 1
): Promise<PaginatedResponse<IProduct>> {
  try {
    const res = await apiFetch(
      `/products/pagination/all?limit=${limit}&page=${page}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return {
      data: [],
      pagination_State: { total: 0, page: 1, limit, totalPages: 0 },
    };
  }
}

// soft delete du product (archive, avaliable = false ) donc on le sort du catalogue client
export async function archiveProduct(id: number) {
  const res = await apiFetch(`/products/${id}/archive`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// create product admin
export async function createProductAdmin(
  data: ProductFormData,
  images: File[] = []
): Promise<IProduct | null> {
  try {
    const formData = new FormData();

    // Ajout des champs texte
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("stock", String(data.stock));
    if (data.scientific_name) {
      formData.append("scientific_name", data.scientific_name);
    }
    if (data.carbon !== null && data.carbon !== undefined) {
      formData.append("carbon", String(data.carbon));
    }
    formData.append("available", String(data.available));

    // Ajout des images (max 3, selon ton back)
    images.slice(0, 3).forEach((file) => {
      formData.append("images", file);
    });

    const res = await apiFetch(`/products`, {
      method: "POST",
      body: formData,
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(
        responseData.error || `Erreur API: ${res.status} ${res.statusText}`
      );
    }

    return responseData;
  } catch (error) {
    console.error("Erreur API (createProductAdmin):", error);
    throw error;
  }
}

// récupérer un produit
export async function getProductByIdAdmin(id: number) {
  const res = await apiFetch(`/products/${id}`, { method: "GET" });
  if (!res.ok) throw new Error(`Erreur API: ${res.statusText}`);
  return res.json();
}

// update un produit
export async function updateProductAdmin(
  id: number,
  data: Partial<ProductFormData>,
  images?: File[]
) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  if (images) {
    images.forEach((img) => {
      formData.append("images", img);
    });
  }

  const res = await apiFetch(`/products/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error(`Erreur API: ${res.statusText}`);
  return res.json();
}
