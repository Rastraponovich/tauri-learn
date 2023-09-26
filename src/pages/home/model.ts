import { combine, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { Category } from "~/entities/categories/model";

import { convertDateToString } from "~/shared/lib/dates";
import { routes } from "~/shared/routing";

import { addDays } from "./helpers";

export const currentRoute = routes.home;

export type Transaction = {
  id: number;
  amount: number;
  category: Category;
  date: string;
};

type Reduced = {
  backgroundColor: string[];
  data: number[];
  labels: string[];
};

export const transactionAdded = createEvent<Omit<Transaction, "id">>();
export const transactionSubmitted = createEvent();
export const amountChanged = createEvent<string>();
export const categoryChanged = createEvent<Category>();
export const dateChanged = createEvent<string>();
export const categorySelected = createEvent<Category["id"]>();

export const dateEndChanged = createEvent<string>();
export const dateStartChanged = createEvent<string>();
export const filterApplied = createEvent();

export const $transactions = createStore<Transaction[]>([]);
export const $transactionsFiltered = createStore<Transaction[]>([]);
export const $amount = createStore(0);
export const $dateStart = createStore(convertDateToString(addDays(-7)));
export const $dateEnd = createStore(convertDateToString(new Date()));
export const $category = createStore<Category | null>(null);
export const $date = createStore(convertDateToString(new Date()));

export const $categoriesSelected = createStore<Category["id"][]>([]);

export const $balance = $transactions.map((transactions) => {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
});

const $transaction = combine({
  amount: $amount,
  category: $category,
  date: $date,
});

export const $categoriesList = $transactions.map((transactions) => {
  return transactions.reduce<Record<string, Category & { amount: number }>>((acc, transaction) => {
    if (!acc[transaction.category.name]) {
      acc[transaction.category.name] = { ...transaction.category, amount: 0 };
    }
    acc[transaction.category.name].amount += transaction.amount;
    return acc;
  }, {});
});

export const $categoriesStats = $categoriesList.map((categories) => {
  const total = Object.entries(categories).reduce((total, [_, category]) => {
    total += category.amount;
    return total;
  }, 0);

  return {
    total,
    count: Object.keys(categories).length,
  };
});

export const $charts = $transactions.map((transactions) => {
  return transactions.reduce<Reduced>(
    (acc, { category, amount }) => {
      acc.backgroundColor.push(category.color);
      acc.data.push(amount);
      acc.labels.push(category.name);

      return acc;
    },
    {
      backgroundColor: [],
      data: [],
      labels: [],
    },
  );
});

$amount.on(amountChanged, (_, amount) => Number(amount));
$date.on(dateChanged, (_, date) => date);

$category.on(categoryChanged, (_, category) => category);

$transactions.on(transactionAdded, (transactions, transaction) => {
  return [...transactions, { ...transaction, id: transactions.length }];
});

$dateStart.on(dateStartChanged, (_, date) => date);
$dateEnd.on(dateEndChanged, (_, date) => date);

sample({
  //@ts-ignore
  clock: transactionSubmitted,
  source: $transaction,
  filter: (transaction) =>
    transaction.amount > 0 && transaction.category && transaction.category.name.length > 0,

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
  fn: ({ transactions, selectedCategories }) => {
    if (selectedCategories.length) {
      return transactions.filter((transaction) =>
        selectedCategories.includes(transaction.category.id),
      );
    }
    return transactions;
  },
  target: $transactionsFiltered,
});

sample({
  clock: filterApplied,
  source: {
    transactions: $transactions,
    categories: $categoriesSelected,
    start: $dateStart,
    end: $dateEnd,
  },

  fn: ({ transactions, categories, start, end }) => {
    const filteredTransactions = transactions.filter((transaction) => {
      const isInCategory = categories.length === 0 || categories.includes(transaction.category.id);
      const isWithinDateRange = transaction.date >= start && transaction.date <= end;
      return isInCategory && isWithinDateRange;
    });

    return filteredTransactions;
  },

  target: $transactionsFiltered,
});

reset({
  clock: $transactions,
  target: [$amount, $category],
});
