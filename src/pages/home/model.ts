import { combine, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { routes } from "~/shared/routing";

export const currentRoute = routes.home;

type Transaction = {
  id: number;
  amount: number;
  type?: string;
  category?: string;
  date?: string;
};

export const transactionSubmitted = createEvent();
export const amountChanged = createEvent<number>();
export const categoryChanged = createEvent<string>();
export const dateChanged = createEvent<string>();

export const $transactions = createStore<Transaction[]>([]);
export const $amount = createStore(0);
export const $category = createStore("");
export const $date = createStore(new Date().toLocaleDateString("ru"));

export const $balance = $transactions.map((transactions) => {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
});

const $transaction = combine({
  amount: $amount,
  category: $category,
  type: "",
  date: $date,
});

$amount.on(amountChanged, (_, amount) => amount);
$date.on(dateChanged, (_, date) => date);

$category.on(categoryChanged, (_, category) => category);

sample({
  clock: transactionSubmitted,
  source: { transaction: $transaction, transactions: $transactions },

  fn: ({ transaction, transactions }) => {
    return [...transactions, { ...transaction, id: transactions.length }];
  },
  target: $transactions,
});

reset({
  clock: $transactions,
  target: [$amount, $category],
});
