import { IProduct } from "../product/model";

export interface ICartItem {
  _id: string;
  productId: string;
  quantity: number;
  unit: string;
  product: IProduct;
}

export interface ICart {
  tax: number;
  subTotal: number;
  totalPrice: number;
  items: ICartItem[];
}

export interface ICheckout {
  address: string;
  email: string;
  contactPhone: string;
}
