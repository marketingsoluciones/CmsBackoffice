import React from "react";

interface DataQualityIndicatorProps {
  score: number; // 0-100
  showLabel?: boolean;
  showBar?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { fontSize: "10px", barHeight: "4px", padding: "2px 0" },
  md: { fontSize: "11px", barHeight: "6px", padding: "4px 0" },
  lg: { fontSize: "12px", barHeight: "8px", padding: "6px 0" },
};

const getColor = (score: number): { bg: string; text: string; bar: string } => {
  if (score >= 80) {
    return { bg: "#D1FAE5", text: "#059669", bar: "#10B981" };
  } else if (score >= 60) {
    return { bg: "#FEF3C7", text: "#D97706", bar: "#F59E0B" };
  } else {
    return { bg: "#FEE2E2", text: "#DC2626", bar: "#EF4444" };
  }
};

export default function DataQualityIndicator({ 
  score, 
  showLabel = true, 
  showBar = true,
  size = "md" 
}: DataQualityIndicatorProps) {
  const colors = getColor(score);
  const sizeStyle = sizeConfig[size];
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <div className="flex items-center gap-2" style={{ padding: sizeStyle.padding }}>
      {showLabel && (
        <span
          style={{
            fontSize: sizeStyle.fontSize,
            fontWeight: 600,
            color: colors.text,
            minWidth: "35px",
          }}
        >
          {Math.round(clampedScore)}%
        </span>
      )}
      {showBar && (
        <div
          className="flex-1 rounded-full overflow-hidden"
          style={{
            backgroundColor: "#E5E7EB",
            height: sizeStyle.barHeight,
            minWidth: "60px",
          }}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${clampedScore}%`,
              backgroundColor: colors.bar,
            }}
          />
        </div>
      )}
    </div>
  );
}
