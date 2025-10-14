export interface IProduct {
  available: boolean;
  carbon: string;
  description?: string;
  id: number;
  image_urls: string[];
  name: string;
  price: string;
  productLocations: IProductLocation[];
  scientific_name?: string;
  slug: string;
  stock: number;
  updated_at?: string;
  created_at?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination_State: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ILocation {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
  productLocations?: IProductLocation[];
}

export interface IProductLocation {
  product_id: number;
  location_id: number;
  created_at: string;
  updated_at: string;
  product: IProduct;
}

export interface IOrder {
  id: number;
  created_at: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  status: string;
  total: number;
  items: {
    id: number;
    product: IProduct | null;
    quantity: number;
    unit_price: number;
  };
}
