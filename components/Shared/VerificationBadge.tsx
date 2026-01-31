import React from "react";

export type VerificationStatus = 
  | "verified" 
  | "unverified" 
  | "bounced" 
  | "invalid" 
  | "active" 
  | "inactive" 
  | "not_registered";

export type VerificationType = "email" | "phone" | "whatsapp";

interface VerificationBadgeProps {
  status?: VerificationStatus;
  type: VerificationType;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const statusConfig: Record<VerificationType, Record<VerificationStatus, { color: string; bgColor: string; label: string; icon: string }>> = {
  email: {
    verified: { color: "#059669", bgColor: "#D1FAE5", label: "Verificado", icon: "✓" },
    unverified: { color: "#D97706", bgColor: "#FEF3C7", label: "No verificado", icon: "?" },
    bounced: { color: "#DC2626", bgColor: "#FEE2E2", label: "Rebotado", icon: "✗" },
    invalid: { color: "#DC2626", bgColor: "#FEE2E2", label: "Inválido", icon: "✗" },
    active: { color: "#059669", bgColor: "#D1FAE5", label: "Activo", icon: "✓" },
    inactive: { color: "#DC2626", bgColor: "#FEE2E2", label: "Inactivo", icon: "✗" },
    not_registered: { color: "#6B7280", bgColor: "#F3F4F6", label: "No registrado", icon: "○" },
  },
  phone: {
    verified: { color: "#059669", bgColor: "#D1FAE5", label: "Verificado", icon: "✓" },
    unverified: { color: "#D97706", bgColor: "#FEF3C7", label: "No verificado", icon: "?" },
    bounced: { color: "#DC2626", bgColor: "#FEE2E2", label: "Rebotado", icon: "✗" },
    invalid: { color: "#DC2626", bgColor: "#FEE2E2", label: "Inválido", icon: "✗" },
    active: { color: "#059669", bgColor: "#D1FAE5", label: "Activo", icon: "✓" },
    inactive: { color: "#DC2626", bgColor: "#FEE2E2", label: "Inactivo", icon: "✗" },
    not_registered: { color: "#6B7280", bgColor: "#F3F4F6", label: "No registrado", icon: "○" },
  },
  whatsapp: {
    verified: { color: "#059669", bgColor: "#D1FAE5", label: "Verificado", icon: "✓" },
    unverified: { color: "#D97706", bgColor: "#FEF3C7", label: "No verificado", icon: "?" },
    bounced: { color: "#DC2626", bgColor: "#FEE2E2", label: "Rebotado", icon: "✗" },
    invalid: { color: "#DC2626", bgColor: "#FEE2E2", label: "Inválido", icon: "✗" },
    active: { color: "#059669", bgColor: "#D1FAE5", label: "Activo", icon: "✓" },
    inactive: { color: "#DC2626", bgColor: "#FEE2E2", label: "Inactivo", icon: "✗" },
    not_registered: { color: "#6B7280", bgColor: "#F3F4F6", label: "No registrado", icon: "○" },
  },
};

const sizeConfig = {
  sm: { padding: "2px 6px", fontSize: "10px", iconSize: "10px" },
  md: { padding: "4px 8px", fontSize: "11px", iconSize: "12px" },
  lg: { padding: "6px 10px", fontSize: "12px", iconSize: "14px" },
};

export default function VerificationBadge({ 
  status = "unverified", 
  type, 
  size = "md", 
  showText = true 
}: VerificationBadgeProps) {
  const config = statusConfig[type][status];
  const sizeStyle = sizeConfig[size];

  if (!config) {
    return null;
  }

  return (
    <span
      className="inline-flex items-center gap-1 rounded-sm font-medium"
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        lineHeight: "1",
      }}
      title={config.label}
    >
      <span style={{ fontSize: sizeStyle.iconSize, lineHeight: "1" }}>{config.icon}</span>
      {showText && <span>{config.label}</span>}
    </span>
  );
}
