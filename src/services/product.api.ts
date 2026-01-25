import { PaginatedResponse, IProduct } from "@/types/index.types";
import { normalizeImagePath } from "@/lib/normalizeImagePath";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SHOULD_USE_MOCKS =
  !API_URL ||
  (process.env.NODE_ENV === "production" &&
    /localhost|127\.0\.0\.1/i.test(API_URL));

let mockProductsCache: IProduct[] | null = null;

async function getMockProducts(): Promise<IProduct[]> {
  if (mockProductsCache) {
    return mockProductsCache.map(normalizeImages);
  }

  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL
        ? process.env.NEXT_PUBLIC_SITE_URL
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      : "";

  const res = await fetch(`${baseUrl}/data/products.json`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur mock produits: ${res.status} ${res.statusText}`);
  }

  const data: IProduct[] = await res.json();
  mockProductsCache = data;
  return data.map(normalizeImages);
}

function normalizeImages(product: IProduct): IProduct {
  return {
    ...product,
    image_urls: (product.image_urls || []).map(normalizeImagePath),
  };
}


export async function getAllProducts() {
  try {
    if (SHOULD_USE_MOCKS) {
      return await getMockProducts();
    }

    const res = await fetch(`${API_URL}/products`, {
      method: "GET",
      cache: "no-store",
    });

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
    if (SHOULD_USE_MOCKS) {
      const all = await getMockProducts();
      const total = all.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      return {
        data: all.slice(start, start + limit),
        pagination_State: { total, page, limit, totalPages },
      };
    }

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
    if (SHOULD_USE_MOCKS) {
      const all = await getMockProducts();
      const product = all.find((p) => p.id === id);
      if (!product) {
        throw new Error(`Produit ${id} introuvable (mock)`);
      }
      return product;
    }

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
    if (SHOULD_USE_MOCKS) {
      const all = await getMockProducts();
      const product = all.find((p) => p.id === productId);
      return { stock: product?.stock ?? 0 };
    }

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
