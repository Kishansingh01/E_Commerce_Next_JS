export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
  image: string;
}

export interface CollectionLink {
  name: string;
  slug: string;
}
