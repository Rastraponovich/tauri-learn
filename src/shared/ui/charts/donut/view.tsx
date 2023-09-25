import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { forwardRef } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
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
        maintainAspectRatio: false,
        responsive: true,

        plugins: {
          legend: {
            display: true,

            labels: {
              color: "#000",
              usePointStyle: true,
              font: { size: 14, weight: "light", style: "oblique" },
            },
            title: {
              display: true,
              text: "Categories",
              color: "#000",
            },
          },
        },
      }}
      ref={ref}
    />
  );
});
