import React from "react";

interface EntitiesStatsProps {
  total?: number;
  companies?: number;
  organizations?: number;
  partners?: number;
  loading?: boolean;
}

export default function EntitiesStats({
  total = 0,
  companies = 0,
  organizations = 0,
  partners = 0,
  loading = false,
}: EntitiesStatsProps) {
  const stats = [
    {
      label: "Total Entidades",
      value: total,
      icon: "🏢",
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
    },
    {
      label: "Empresas",
      value: companies,
      icon: "💼",
      color: "#3B82F6",
      bgColor: "#DBEAFE",
    },
    {
      label: "Organizaciones",
      value: organizations,
      icon: "🌐",
      color: "#10B981",
      bgColor: "#D1FAE5",
    },
    {
      label: "Socios",
      value: partners,
      icon: "🤝",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-lg p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
          >
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-lg p-4 transition-shadow hover:shadow-md"
          style={{ 
            backgroundColor: "#FFFFFF", 
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "20px" }}>{stat.icon}</span>
            <div
              className="rounded-full"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: stat.color,
              }}
            />
          </div>
          <div
            className="font-semibold mb-1"
            style={{ fontSize: "24px", color: "#111827" }}
          >
            {stat.value.toLocaleString()}
          </div>
          <div
            className="text-xs"
            style={{ color: "#6B7280" }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
