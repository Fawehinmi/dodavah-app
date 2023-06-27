import Product from "../../pages/product/[id]";
import { IProduct, IProductImages } from "../product/model";

export interface IOrder {
  _id: string;
  ref: string;
  createdAt: string;

  status: string;
  items: IOrderItem[];
  tax: number;
  subTotal: number;
  totalPrice: number;
  contactName: string;
  contactPhone: string;
  address: string;
}

export enum OrderStatusType {
  PENDING = "PENDING",
  PAID = "PAID",
  CONFIRMED = "CONFIRMED",
  SENDOUT = "SENDOUT",
  CANCELLED = "CANCELLED",
}

export interface IOrderItem {
  _id: string;
  product: IProduct;
  quantity: string;
  price: number;
  images: IProductImages[];
  totalAmount: number;
}

export interface IOrderPageParams {
  skip: number;
  take: number;
}
