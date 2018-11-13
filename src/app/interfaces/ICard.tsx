export default interface ICard {
  barcode: string;
  name: string;
  imageUrl: string;
  size: string;
  prices: IPrice[];
}

export interface IPrice {
  id: string;
  price: number;
  cupString: string;
  store: string;
}
