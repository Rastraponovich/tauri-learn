import { combine, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { routes } from "~/shared/routing";

export const currentRoute = routes.home;

export type Transaction = {
  id: number;
  amount: number;
  type?: string;
  category: string;
  date?: string;
};

export const transactionAdded = createEvent<Omit<Transaction, "id">>();
export const transactionSubmitted = createEvent();
export const amountChanged = createEvent<number>();
export const categoryChanged = createEvent<string>();
export const dateChanged = createEvent<string>();
export const categorySelected = createEvent<string>();

export const $transactions = createStore<Transaction[]>([]);
export const $transactionsFiltered = createStore<Transaction[]>([]);
export const $amount = createStore(0);
export const $category = createStore("");
export const $date = createStore(new Date().toLocaleDateString("ru"));

export const $categoriesSelected = createStore<string[]>([]);

export const $balance = $transactions.map((transactions) => {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
});

const $transaction = combine({
  amount: $amount,
  category: $category,
  type: "",
  date: $date,
});

export const $categoriesList = $transactions.map((transactions) => {
  return transactions.reduce<Record<Transaction["category"], number>>((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {});
});

$amount.on(amountChanged, (_, amount) => amount);
$date.on(dateChanged, (_, date) => date);

$category.on(categoryChanged, (_, category) => category);

$transactions.on(transactionAdded, (transactions, transaction) => {
  return [...transactions, { ...transaction, id: transactions.length }];
});

sample({
  clock: transactionSubmitted,
  source: $transaction,
  target: transactionAdded,
});

$categoriesSelected.on(categorySelected, (categories, categorySelected) => {
  if (categories.includes(categorySelected)) {
    return categories.filter((category) => category !== categorySelected);
  }

  return [...categories, categorySelected];
});

sample({
  clock: [transactionAdded, categorySelected],
  source: { transactions: $transactions, selectedCategories: $categoriesSelected },
  fn: ({ transactions, selectedCategories }, _) => {
    if (selectedCategories.length) {
      return transactions.filter((transaction) =>
        selectedCategories.includes(transaction.category),
      );
    }
    return transactions;
  },
  target: $transactionsFiltered,
});

reset({
  clock: $transactions,
  target: [$amount, $category],
});
