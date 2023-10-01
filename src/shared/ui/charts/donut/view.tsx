import { useState } from "react";

import { BACKGROUND_COLORS, GAP, STROKE_COLORS } from "./constants";
import { getStrokeDashArray } from "./helpers";

type ChartData = {
  id: number;
  color: string;
  amount: number;
  percentage: number;
  name: string;
};

interface DynamicDonutChartProps {
  data: number[];
  gap?: number;
  legend: ChartData[];
}

export const DynamicDonutChart = ({ data, legend }: DynamicDonutChartProps) => {
  const charts = data.reduce<{ value: number[]; offset: number }[]>((result, value, index, arr) => {
    const offset = index >= 1 ? result[index - 1].offset - arr[index - 1] : 0;
    return [...result, { value: [value, 100], offset }];
  }, []);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="font-normal dark:text-white">
        <ul>
          {legend.map((unit, index) => (
            <li key={unit.id}>
              <div className="flex items-center gap-2">
                <i
                  className={`${BACKGROUND_COLORS[index]} mx-4 h-2 w-2 rounded-full`}
                  aria-hidden="true"
                ></i>
                <span>{unit.name}:</span>
                <span className="font-semibold">{unit.amount}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <svg className="chart min-w-[500px]" width="500" height="500" viewBox="0 0 50 50">
        <circle
          className={`animate-[render_0.3s_ease-in-out]  cursor-none fill-none transition-all duration-300 `}
          r={15.9}
          cx={"50%"}
          cy={"50%"}
          strokeWidth={10}
        />
        {charts.map((unit, index) => (
          <DonutSlice key={index} {...unit} id={index} r={15.9} />
        ))}
      </svg>
    </div>
  );
};

interface DonutSliceProps {
  value: number[];
  offset: number;
  r: number;
  id: number;
}

const DonutSlice = (props: DonutSliceProps) => {
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  return (
    <g>
      <circle
        className={`${STROKE_COLORS[props.id]} 
        animate-[render_0.3s_ease-in-out] cursor-pointer fill-none transition-all duration-300 hover:opacity-80`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        r={props.r}
        cx={"50%"}
        cy={"50%"}
        strokeWidth={hovered ? 12 : 10}
        strokeDasharray={getStrokeDashArray(props.value, GAP)}
        strokeDashoffset={props.offset}
      />
    </g>
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
