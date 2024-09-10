import React, { FC } from 'react';

interface BarChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

const BarChart: FC<BarChartProps> = ({ data }) => {
  return (
    <div className="flex text-xs">
      <svg width="300" height="200" viewBox="0 0 300 200">
        <g transform="translate(50, 150)">
          {data.map((bar, index) => (
            <rect
              key={index}
              x={index * 25}
              y={-bar.value * 20}
              width={20}
              height={bar.value * 20}
              fill={bar.color}
            />
          ))}
        </g>
        <g transform="translate(-50, 0)">
          {/* Eje Y: Etiquetas de los valores */}
          {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((value, index) => (
            <text key={index} x={-20} y={-value * 20} textAnchor="end">{value}</text>
          ))}
        </g>
      </svg>
      <div className="w-[100px] text-labels flex-col items-center justify-center py-2 gap-2 divide-y text-gray-700"> {/* Added a class for styling */}
        {data.map((bar, index) => (
          <p key={index}> {/* Changed text to p element */}
            {bar.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BarChart;