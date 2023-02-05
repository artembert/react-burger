export type OrderHistoryRes = {
  success: boolean;
  orders: {
    ingredients: string[];
    name: string;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
  }[];
  total: number;
  totalToday: number;
};
