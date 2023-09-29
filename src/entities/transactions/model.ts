import { createEvent, createStore } from "effector";

import { Category } from "../categories";

export type Transaction = {
  id: number;
  amount: number;
  category: Category;
  date: string;
};

export const transactionAdd = createEvent<Omit<Transaction, "id">>();

export const $transactions = createStore<Transaction[]>([]);

$transactions.on(transactionAdd, (transactions, transaction) => {
  return [...transactions, { ...transaction, id: transactions.length + 1 }];
});
