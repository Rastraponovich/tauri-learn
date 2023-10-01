import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { t } from "i18next";
import { forwardRef, useState } from "react";
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
      className="dark:text-white"
      data={props.data}
      options={{
        maintainAspectRatio: false,
        responsive: true,

        plugins: {
          legend: {
            display: true,

            labels: {
              usePointStyle: true,
              font: { size: 14, weight: "light" },
            },
            title: {
              display: true,
              text: t(props.title || ""),
              font: {
                size: 16,
              },
            },
          },
        },
      }}
      ref={ref}
    />
  );
});

const units = [
  { id: 1, color: "stroke-blue-500", value: [8, 100], offset: 0 },
  { id: 2, color: "stroke-orange-500", value: [11, 100], offset: -8 },
  { id: 3, color: "stroke-green-500", value: [11, 100], offset: -19 },
  { id: 4, color: "stroke-yellow-500", value: [14, 100], offset: -30 },
  { id: 5, color: "stroke-zinc-500", value: [11, 100], offset: -44 },
  { id: 6, color: "stroke-rose-500", value: [5, 100], offset: -55 },
  { id: 7, color: "stroke-purple-500", value: [40, 100], offset: -60 },
];

const GAP = 0.5;

export const DynamicDonutChart = () => {
  return (
    <svg className="chart min-w-[500px]" width="500" height="500" viewBox="0 0 50 50">
      <circle
        className={`animate-[render_0.3s_ease-in-out]  cursor-none fill-none transition-all duration-300 `}
        r={15.9}
        cx={"50%"}
        cy={"50%"}
        strokeWidth={10}
      />
      {units.map((unit) => (
        <DonutSlice key={unit.id} {...unit} r={15.9} />
      ))}
    </svg>
  );
};

interface DonutSliceProps {
  color: string;
  value: number[];
  offset: number;
  r: number;
}

const DonutSlice = (props: DonutSliceProps) => {
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  const strokeDasharray = [props.value[0] - GAP, props.value[1]].join(", ");
  return (
    <circle
      className={`${props.color}  animate-[render_0.3s_ease-in-out] cursor-pointer fill-none transition-all duration-300 hover:opacity-80`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      r={props.r}
      cx={"50%"}
      cy={"50%"}
      strokeWidth={hovered ? 12 : 10}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={props.offset}
    />
  );
};

// const WIDTH = 200;
// const HEIGHT = 200;
// const STROKE_WIDTH = 25;

// const DynamicDonutChart3 = () => {
//   const [data, _] = useState([
//     { value: 30, color: "red" },
//     { value: 50, color: "blue" },
//     { value: 20, color: "green" },
//     { value: 5, color: "gold" },
//   ]);

//   const cx = WIDTH / 2;
//   const cy = HEIGHT / 2;
//   const r = WIDTH / 2 - STROKE_WIDTH;
//   const C = 2 * Math.PI * r;

//   const computedGap = (C * GAP) / 100;
//   const sumGapPercentage = (GAP * (data.length - 1)) / 100;

//   const strokeDashArrays = data.map((percent) => {
//     return [
//       (C * (1 - sumGapPercentage) * percent.value) / 100,
//       C * (1 - (percent.value / 100) * (1 - sumGapPercentage)),
//     ];
//   });

//   const strokeDashOffsets = strokeDashArrays.map((strdi, index) => {
//     return strokeDashArrays
//       .slice(0, index)
//       .reduce((acc, item) => (index >= 1 ? acc - item[0] - computedGap : acc - item[0]), C);
//   });

//   const calculateColor = (index: number) => {
//     return data[index].color;
//   };

//   return (
//     <svg width={WIDTH} height={HEIGHT} viewBox="0 0 200 200">
//       <circle
//         fill="transparent"
//         stroke="#b9cad1"
//         cx={cx}
//         cy={cy}
//         r={r}
//         strokeWidth={STROKE_WIDTH}
//       />
//       {strokeDashOffsets.map((item, index) => (
//         <circle
//           fill="transparent"
//           key={item}
//           stroke={calculateColor(index)}
//           cx={cx}
//           cy={cy}
//           r={r}
//           strokeWidth={STROKE_WIDTH}
//           strokeDashoffset={item}
//           strokeDasharray={strokeDashArrays[index].join(", ")}
//         />
//       ))}
//     </svg>
//   );
// };
