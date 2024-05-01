export type PagedResult<T> = {
  pageCount: number;
  totalCount: number;
  results: T[];
};

export type Auction = {
  id: string;
  reservePrice: number;
  seller: string;
  winner?: string;
  soldAmount: number;
  currentHighBid: number;
  createdAt: string;
  updatedAt: string;
  auctionEnd: string;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
};
