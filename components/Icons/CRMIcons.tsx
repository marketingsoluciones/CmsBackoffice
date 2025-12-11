import { FC } from "react";
import { PropsIcon } from "./index";
import {
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

// Icono para Leads - Usando ChartBar de Heroicons
export const LeadsIcon: FC<PropsIcon> = ({ className = "", width = 24, fill = "#6B7280" }) => {
  return (
    <ChartBarIcon
      width={width}
      height={width}
      className={className}
      style={{ color: fill }}
    />
  );
};

// Icono para Contactos - Usando UserGroup de Heroicons
export const ContactsIcon: FC<PropsIcon> = ({ className = "", width = 24, fill = "#6B7280" }) => {
  return (
    <UserGroupIcon
      width={width}
      height={width}
      className={className}
      style={{ color: fill }}
    />
  );
};

// Icono para Entidades - Usando BuildingOffice de Heroicons
export const EntitiesIcon: FC<PropsIcon> = ({ className = "", width = 24, fill = "#6B7280" }) => {
  return (
    <BuildingOfficeIcon
      width={width}
      height={width}
      className={className}
      style={{ color: fill }}
    />
  );
};

// Icono para Campañas - Usando Megaphone de Heroicons
export const CampaignsIcon: FC<PropsIcon> = ({ className = "", width = 24, fill = "#6B7280" }) => {
  return (
    <MegaphoneIcon
      width={width}
      height={width}
      className={className}
      style={{ color: fill }}
    />
  );
};
