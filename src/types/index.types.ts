export interface Product {
  available: boolean;
  id: number;
  name: string;
  slug: string;
  price: string; 
  description?: string;
  image_urls: string[];
  stock?: number;
  scientific_name?: string;
  carbon: string;
  created_at?: string;
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
