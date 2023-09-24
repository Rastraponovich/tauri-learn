import { Link } from "atomic-router-react";
import { useList, useStoreMap, useUnit } from "effector-react";
import { FormEvent } from "react";

import { routes } from "~/shared/routing";
import { Badge } from "~/shared/ui/bage";
import { Input, Number } from "~/shared/ui/input";

import {
  $amount,
  $balance,
  $category,
  $date,
  $transactions,
  amountChanged,
  categoryChanged,
  dateChanged,
  transactionSubmitted,
} from "./model";

export const HomePage = () => {
  return (
    <section className="flex grow flex-col gap-10  text-center">
      <header>
        <h1 className="text-bold text-3xl">Welcome</h1>
        <Link to={routes.posts.posts}>
          <a className="text-blue-300 hover:underline">click to start</a>
        </Link>
      </header>

      <section className="grid grid-cols-3">
        <div>
          <Balance />
        </div>
        <ul className="col-span-1 col-end-4">
          <li>1. расходы</li>
          <li>2. доходы</li>
          <li>3. категории</li>
          <li>4. фильтр по периодам</li>
          <li>5. фильтр по категориям</li>
        </ul>
      </section>
    </section>
  );
};

const Balance = () => {
  const [balance] = useUnit([$balance]);

  return (
    <article className="flex flex-col gap-2 rounded-md p-2 shadow-md">
      <h2 className="text-3xl font-bold"> {balance} &#x20bd;</h2>
      <div className="flex items-center gap-1 ">
        <Badge>asdasd</Badge>
        <Badge variant="error">asdasd</Badge>
        <Badge size="sm">asdasd</Badge>
        <Badge size="sm" variant="error">
          asdasd
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <TransactionForm />
        <TransactionList />
      </div>
    </article>
  );
};

const TransactionForm = () => {
  const [date, amount, category] = useUnit([$date, $amount, $category]);
  const [onSubmit, handleChangeAmount, handleChangeCategory, handleDateChanged] = useUnit([
    transactionSubmitted,
    amountChanged,
    categoryChanged,
    dateChanged,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form id="transaction-form" className="flex flex-col gap-2 rounded-md" onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => handleDateChanged(e.target.value)} />
      <Number value={amount} onValueChange={handleChangeAmount} label="Amount" />
      <Input
        value={category}
        onValueChange={handleChangeCategory}
        placeholder="enter category"
        label="Category"
      />
      <button type="submit">submit</button>
    </form>
  );
};

const TransactionList = () => {
  return (
    <div className="flex flex-col gap-1">
      {useList($transactions, {
        fn: ({ id }) => <TransactionEntry id={id} />,
      })}
    </div>
  );
};

interface TransactionEntryProps {
  id: number;
}
const TransactionEntry = ({ id }: TransactionEntryProps) => {
  const { amount, category, date } = useStoreMap({
    store: $transactions,
    keys: [id],
    fn: (transactions) => transactions.find((transaction) => transaction.id === id)!,
  });
  return (
    <div className="flex gap-2 rounded-md border p-2 text-sm font-normal">
      <span>{date}</span>
      <span className="font-bold after:content-['\20BD']">{amount}</span>
      <span className="grow"></span>
      <span className="italic text-gray-500">{category}</span>
    </div>
  );
};
