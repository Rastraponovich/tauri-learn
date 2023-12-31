import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { t } from "i18next";
import { forwardRef } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  title?: string;
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
      hoverOffset?: number;
    }[];
  };
}

export const DonutChart = forwardRef<any, DonutChartProps>((props: DonutChartProps, ref) => {
  return (
    <Doughnut
      data={props.data}
      options={{
        maintainAspectRatio: true,
        responsive: true,

        plugins: {
          legend: {
            display: true,

            labels: {
              color: "#000",
              usePointStyle: true,
              font: { size: 14, weight: "light" },
            },
            title: {
              display: true,
              text: t(props.title || ""),
              font: {
                size: 16,
              },
              color: "#000",
            },
          },
        },
      }}
      ref={ref}
    />
  );
});
