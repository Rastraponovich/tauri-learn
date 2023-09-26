import { Link } from "atomic-router-react";
import clsx from "clsx";
import { useList, useStoreMap, useUnit } from "effector-react";
import { t } from "i18next";
import { FormEvent, memo } from "react";
import { useTranslation } from "react-i18next";

import { CategoriesSelect } from "~/entities/categories";

import { routes } from "~/shared/routing";
import { Badge } from "~/shared/ui/bage";
import { DonutChart } from "~/shared/ui/charts";
import { Number } from "~/shared/ui/input";
import { SelectTemplateProps } from "~/shared/ui/select";

import {
  $amount,
  $balance,
  $categoriesList,
  $categoriesSelected,
  $charts,
  $date,
  $transactionsFiltered,
  amountChanged,
  categoryChanged,
  categorySelected,
  dateChanged,
  transactionSubmitted,
} from "./model";

export const HomePage = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");
  };
  return (
    <>
      <header className="flex justify-end p-1">
        <button
          onClick={toggleLanguage}
          className="flex h-10 w-10 items-center justify-center rounded-md border "
        >
          {i18n.language}
        </button>
      </header>
      <section className="flex grow flex-col gap-10  text-center">
        <header>
          <h1 className="text-bold text-3xl">{t("Welcome")}</h1>
          <Link to={routes.posts.posts}>
            <span className="text-blue-300 hover:underline">{t("click to start")}</span>
          </Link>
        </header>

        <section className="grid grid-cols-2">
          <div>
            <Balance />
          </div>
          <div>
            <Chart />
          </div>
        </section>
      </section>
    </>
  );
};

const Balance = () => {
  const [balance] = useUnit([$balance]);

  return (
    <article className="flex flex-col gap-2 rounded-md p-2 shadow-md">
      <h2 className="text-3xl font-bold after:content-['\20BD']"> {balance}</h2>
      <Categories />
      <div className="flex flex-col gap-2">
        <TransactionForm />
        <TransactionList />
      </div>
    </article>
  );
};

const TransactionForm = () => {
  const [date, amount] = useUnit([$date, $amount]);
  const { t } = useTranslation();

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
      <Number value={amount} onValueChange={handleChangeAmount} label={t("Amount")} />

      <CategoriesSelect
        onChange={handleChangeCategory}
        template={SelectTemplate}
        templateProps={{ displayProperty: "name", keyProperty: "id" }}
      />
      <button type="submit">{t("submit")}</button>
    </form>
  );
};

const TransactionList = () => {
  return (
    <div className="flex flex-col gap-1">
      {useList($transactionsFiltered, {
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
    store: $transactionsFiltered,
    keys: [id],
    fn: (transactions) => transactions.find((transaction) => transaction.id === id)!,
  });
  return (
    <div className="flex gap-2 rounded-md border p-2 text-sm font-normal">
      <span>{date}</span>
      <span className="font-bold after:content-['\20BD']">{amount}</span>
      <span className="grow"></span>
      <Badge size="xs" style={{ backgroundColor: category.color }}>
        {category.name}
      </Badge>
    </div>
  );
};

const Categories = () => {
  const [categories, onClick, selected] = useUnit([
    $categoriesList,
    categorySelected,
    $categoriesSelected,
  ]);

  return (
    <div className="flex gap-1">
      {Object.entries(categories).map(([name, category]) => (
        <Badge
          key={name}
          onClick={() => onClick(category.id)}
          selected={selected.includes(category.id)}
          style={{ backgroundColor: category.color }}
        >
          {name}:{category.amount}
        </Badge>
      ))}
    </div>
  );
};

const Chart = () => {
  const reduced = useUnit($charts);

  const data = {
    labels: reduced.labels,
    datasets: [
      {
        data: reduced.data,
        backgroundColor: reduced.backgroundColor,
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  return <DonutChart data={data} title="Categories" />;
};

const SelectTemplate = memo<SelectTemplateProps<any>>(
  ({ item, active, selected, displayProperty }) => {
    return (
      <div className="text-left">
        <span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
          {item[displayProperty] as string}
        </span>
        {selected ? (
          <span
            className={clsx(
              "absolute inset-y-0 left-0 flex items-center pl-3",
              active ? "text-white" : "text-teal-600",
            )}
          >
            <span className="h-5 w-5" aria-hidden="true">
              X
            </span>
          </span>
        ) : null}
      </div>
    );
  },
);
