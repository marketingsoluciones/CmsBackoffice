import { BarChart } from 'lucide-react';
import React from 'react';
import BarData1 from './CReutilizable3';

interface InfoCardProps {
  icon: any;
  title: string;
  body: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, body }) => (
  <div className="self-stretch flex flex-col items-center justify-center bg-white rounded-lg p-4">
    <div className="flex flex-col items-center justify-between">
      <div className="w-8 h-8 mr-4">
        {icon}
        </div>
      <div className='flex flex-col items-center justify-center'>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 text-md">{body}</p>
      </div>
    </div>
  </div>
);

interface ButtonProps {
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, className }) => (
  <button
    className={`bg-pink-300 hover:bg-pink-400 text-white text-base font-medium py-1 px-2 rounded ${className}`}
  >
    {label}
  </button>
);

interface SalesDashboardProps {
  title: string;
  buttonLabels: string[];
  icon: any;
  infoTitle: string;
  infoBody: string;
  className?: string;
  chartData: any;
}

const SalesDashboard: React.FC<SalesDashboardProps> = ({
  title,
  buttonLabels,
  icon,
  infoTitle,
  infoBody,
  chartData
}) => (
  <div className="w-full flex flex-col items-start justify-start bg-gray-200 p-4 rounded-lg">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="flex space-x-4 mb-4">
      {buttonLabels.map((label) => (
        <Button key={label} label={label} />
      ))}
    </div>

    <div className="flex gap-4">
      <div className="w-auto md:flex flex-col items-center justify-center rounded-md bg-white py-2 px-2">
      <BarData1 data={chartData}/>
      </div>
      <InfoCard icon={icon} title={infoTitle} body={infoBody} />
    </div>
  </div>
);

export default SalesDashboard;