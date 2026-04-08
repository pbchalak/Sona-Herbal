export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  benefits: string[];
  ingredients: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Wellness' | 'Skincare' | 'Tea' | 'Immunity';
