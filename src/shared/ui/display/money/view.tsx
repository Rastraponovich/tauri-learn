import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface MoneyProps {
  value: number;
  className?: string;
  currency?: string;
  onClick?: () => void;
}

export const Money = ({ value, currency = "RUB", className, onClick }: MoneyProps) => {
  const { i18n } = useTranslation();

  const caption = value.toLocaleString(i18n.language, { style: "currency", currency });

  return (
    <span
      className={clsx(className, onClick && "cursor-pointer")}
      onClick={onClick}
      title={caption}
    >
      {caption}
    </span>
  );
};
