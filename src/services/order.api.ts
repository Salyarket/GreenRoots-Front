import { Order } from "@/store/AuthStore";
import { apiFetch } from "./api";
import { IOrder } from "@/types/index.types";

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
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
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

// get all the orders (admin)
export async function getAllOrders(
  token: string
): Promise<{ orders: IOrder[] }> {
  const res = await apiFetch("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// delete an order by id
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

// update the status of an order
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
