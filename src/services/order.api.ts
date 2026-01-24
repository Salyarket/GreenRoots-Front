import { Order } from "@/store/AuthStore";
import { apiFetch } from "./api";
import { IOrder, PaginatedResponse } from "@/types/index.types";

// get all orders from user (using the wrapper)
export async function getMyOrders(token: string): Promise<{ orders: Order[] }> {
  const res = await apiFetch("/orders/me/orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// get une commande d'un utilisateur
export async function getOneOrder(token: string, orderId: number) {
  const res = await apiFetch(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// créer une nouvelle commande
export async function createNewOrder(token: string, data: any) {
  const res = await apiFetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // vérifier si besoin du bearer
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  let resData: any = null;
  try {
    resData = await res.json();
  } catch {
    // pas de JSON renvoyé par le backend
  }

  if (!res.ok) {
    const message =
      resData?.error || resData?.message || `Erreur API: ${res.statusText}`;
    throw new Error(message);
  }

  return resData;
}

// get les produits pour une commande
export async function getOrderItems(token: string, orderId: number) {
  const res = await apiFetch(`/orders/${orderId}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// supprimer une commande par son id (admin)
export async function deletOrderById(token: string, orderId: number) {
  const res = await apiFetch(`/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// màj le statut d'une commande (admin)
export async function updateOrderStatus(
  token: string,
  orderId: number,
  status: string
) {
  const res = await apiFetch(`/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// orders with pagination (admin)
export async function getOrdersPaginationAdmin(
  limit: number,
  page: number = 1
): Promise<PaginatedResponse<IOrder>> {
  try {
    const res = await apiFetch(
      `/orders/pagination/all?limit=${limit}&page=${page}`,
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

// récupérer toutes les commandes (admin)
export async function getAllOrdersAdmin(token: string) {
  const res = await apiFetch("/orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GET /api/orders failed (${res.status}) ${txt}`);
  }

  return res.json();
}
