import { PaginatedResponse, IProduct } from "@/types/index.types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function normalizeImages(product: IProduct): IProduct {
  return {
    ...product,
    image_urls: (product.image_urls || []).map((url) => {
      let path = url;

      // Convertir les URL to a relative path for public/ assets.
      if (/^https?:\/\//i.test(path)) {
        try {
          path = new URL(path).pathname;
        } catch {
          // Si parsing échoue, garder l'original string.
        }
      }

      return path.startsWith("/") ? path : `/${path}`;
    }),
  };
}


export async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, { method: "GET", cache: "no-store", });

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.map(normalizeImages);

  } catch (error) {
    console.error("Erreur API:", error);
    throw error; // laisser throw pour que Next affiche error.tsx si ça bug
  }
}

// get products with choice (number)
export async function getProductsPagination(
  limit: number,
  page: number = 1
): Promise<PaginatedResponse<IProduct>> {
  try {
    const res = await fetch(
      `${API_URL}/products/pagination/available?limit=${limit}&page=${page}`,
      {
        cache: "no-store",
      }
    );
    console.log("APPEL API");
    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    // fix URLs images
    data.data = data.data.map(normalizeImages);
    return data;
    
  } catch (error) {
    console.error("Erreur API:", error);
    return {
      data: [],
      pagination_State: {
        total: 0,
        page: 1,
        limit: 3,
        totalPages: 0,
      },
    };
  }
}

// get One product per id
export async function getOneProductWithLocation(id: number): Promise<IProduct> {
  try {
    const res = await fetch(`${API_URL}/products/with_location/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return normalizeImages(data);

  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}

// get the stock of a product
export async function getStockForProduct(productId: number) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ item }),
    });
    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}
