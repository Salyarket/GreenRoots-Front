import { Order } from "@/store/AuthStore";
import { apiFetch } from "./api";

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

// get one order from user
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

// create a new order
export async function createNewOrder(token: string, data: any) {
  const res = await apiFetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

// get the items for an order
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
