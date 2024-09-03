import React, { FC } from 'react';

interface BarChartProps {
    data: {
      label: string;
      value: number;
      color: string;
    }[];
  }
  
  const BarChart: FC <BarChartProps> = ({ data }) => (
    <>
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
      <g transform="translate(0, -150)">
        {/* Eje X: Etiquetas de las horas */}
        {data.map((bar, index) => (
          <text key={index} x={index * 25} y={10} textAnchor="middle">{bar.label}</text>
        ))}
      </g>
      <g transform="translate(-50, 0)">
        {/* Eje Y: Etiquetas de los valores */}
        {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((value, index) => (
          <text key={index} x={-20} y={-value * 20} textAnchor="end">{value}</text>
        ))}
      </g>
    </g>
  </svg>
  </>
);

export default BarChart;