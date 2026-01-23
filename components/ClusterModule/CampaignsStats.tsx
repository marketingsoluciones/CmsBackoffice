import React from "react";

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: string;
  budget?: number;
}

interface CampaignsStatsProps {
  campaigns: Campaign[];
  loading?: boolean;
}

export default function CampaignsStats({ campaigns, loading }: CampaignsStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-sm p-4"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "2px",
            }}
          >
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" style={{ width: "60%" }}></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse" style={{ width: "40%" }}></div>
          </div>
        ))}
      </div>
    );
  }

  const total = campaigns.length;
  const active = campaigns.filter((c) => c.status === "RUNNING").length;
  const paused = campaigns.filter((c) => c.status === "PAUSED").length;
  const completed = campaigns.filter((c) => c.status === "COMPLETED").length;
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);

  const stats = [
    {
      label: "Total Campañas",
      value: total,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      color: { bg: "#DBEAFE", text: "#1D4ED8", icon: "#3B82F6" },
    },
    {
      label: "Activas",
      value: active,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: { bg: "#D1FAE5", text: "#047857", icon: "#10B981" },
    },
    {
      label: "Pausadas",
      value: paused,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: { bg: "#FEF3C7", text: "#B45309", icon: "#F59E0B" },
    },
    {
      label: "Completadas",
      value: completed,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: { bg: "#E9D5FF", text: "#6B21A8", icon: "#9333EA" },
    },
    {
      label: "Presupuesto Total",
      value: `€${totalBudget.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: { bg: "#D1FAE5", text: "#047857", icon: "#10B981" },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-sm p-4 transition-shadow hover:shadow-sm"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "2px",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className="p-2 rounded-sm"
              style={{
                backgroundColor: stat.color.bg,
                borderRadius: "2px",
              }}
            >
              <div style={{ color: stat.color.icon }}>{stat.icon}</div>
            </div>
          </div>
          <div className="text-xs font-medium mb-1" style={{ color: "#6B7280" }}>
            {stat.label}
          </div>
          <div className="text-xl font-semibold" style={{ color: "#111827" }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}

