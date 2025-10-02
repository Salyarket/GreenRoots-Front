export interface IProduct {
  available: boolean;
  carbon: string;
  created_at?: string;
  description?: string;
  id: number;
  image_urls: string[];
  name: string;
  price: string;
  productLocations: IProductLocation[];
  scientific_name?: string;
  slug: string;
  stock?: number;
  updated_at?: string;
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

export interface IProductLocation {
  product_id: number;
  location_id: number;
  created_at: string;
  updated_at: string;
  location: ILocation;
}

export interface ILocation {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
}
