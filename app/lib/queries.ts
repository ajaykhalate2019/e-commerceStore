export const GET_PRODUCTS = 'https://dummyjson.com/products';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string; 
  images: string[];
  rating: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(GET_PRODUCTS);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.products;
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${GET_PRODUCTS}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch product with ID: ${id}`);
  return res.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const res = await fetch(`${GET_PRODUCTS}/category-list`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const res = await fetch(`${GET_PRODUCTS}/category/${category}`);
  if (!res.ok) throw new Error(`Failed to fetch products for category`);
  const data = await res.json();
  return data.products;
};