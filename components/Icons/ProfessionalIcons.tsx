import React from "react";
import {
  UserIcon as HeroUserIcon,
  EnvelopeIcon,
  PhoneIcon as HeroPhoneIcon,
  BuildingOfficeIcon,
  BriefcaseIcon as HeroBriefcaseIcon,
  GlobeAltIcon,
  MapPinIcon as HeroMapPinIcon,
  CurrencyDollarIcon,
  TagIcon as HeroTagIcon,
  CalendarIcon as HeroCalendarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BoltIcon,
  LinkIcon as HeroLinkIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon as HeroTrashIcon,
  ShareIcon as HeroShareIcon,
  PlusIcon as HeroPlusIcon,
  XMarkIcon,
  CheckIcon as HeroCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// Iconos profesionales usando Heroicons
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  strokeWidth?: number;
}

export const UserIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroUserIcon width={size} height={size} className={className} style={style} />
);

export const MailIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <EnvelopeIcon width={size} height={size} className={className} style={style} />
);

export const PhoneIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroPhoneIcon width={size} height={size} className={className} style={style} />
);

export const BuildingIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <BuildingOfficeIcon width={size} height={size} className={className} style={style} />
);

export const BriefcaseIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroBriefcaseIcon width={size} height={size} className={className} style={style} />
);

export const GlobeIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <GlobeAltIcon width={size} height={size} className={className} style={style} />
);

export const MapPinIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroMapPinIcon width={size} height={size} className={className} style={style} />
);

export const DollarIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <CurrencyDollarIcon width={size} height={size} className={className} style={style} />
);

export const TagIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroTagIcon width={size} height={size} className={className} style={style} />
);

export const CalendarIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroCalendarIcon width={size} height={size} className={className} style={style} />
);

export const FileTextIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <DocumentTextIcon width={size} height={size} className={className} style={style} />
);

export const BarChartIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <ChartBarIcon width={size} height={size} className={className} style={style} />
);

export const ZapIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <BoltIcon width={size} height={size} className={className} style={style} />
);

export const LinkIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroLinkIcon width={size} height={size} className={className} style={style} />
);

export const MoreVerticalIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <EllipsisVerticalIcon width={size} height={size} className={className} style={style} />
);

export const SearchIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <MagnifyingGlassIcon width={size} height={size} className={className} style={style} />
);

export const FilterIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <FunnelIcon width={size} height={size} className={className} style={style} />
);

export const EditIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <PencilIcon width={size} height={size} className={className} style={style} />
);

export const TrashIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroTrashIcon width={size} height={size} className={className} style={style} />
);

export const ShareIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroShareIcon width={size} height={size} className={className} style={style} />
);

export const PlusIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroPlusIcon width={size} height={size} className={className} style={style} />
);

export const XIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <XMarkIcon width={size} height={size} className={className} style={style} />
);

export const CheckIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <HeroCheckIcon width={size} height={size} className={className} style={style} />
);

export const InfoIcon = ({ className = "", style = {}, size = 16 }: IconProps) => (
  <InformationCircleIcon width={size} height={size} className={className} style={style} />
);

// Mapa de iconos por nombre de campo
export const getFieldIcon = (fieldName: string, size = 16): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    name: <UserIcon size={size} />,
    firstName: <UserIcon size={size} />,
    lastName: <UserIcon size={size} />,
    email: <MailIcon size={size} />,
    phone: <PhoneIcon size={size} />,
    company: <BuildingIcon size={size} />,
    organization: <BuildingIcon size={size} />,
    website: <GlobeIcon size={size} />,
    address: <MapPinIcon size={size} />,
    city: <MapPinIcon size={size} />,
    country: <MapPinIcon size={size} />,
    position: <BriefcaseIcon size={size} />,
    title: <FileTextIcon size={size} />,
    value: <DollarIcon size={size} />,
    currency: <DollarIcon size={size} />,
    status: <BarChartIcon size={size} />,
    priority: <ZapIcon size={size} />,
    source: <LinkIcon size={size} />,
    date: <CalendarIcon size={size} />,
    scheduledAt: <CalendarIcon size={size} />,
    notes: <FileTextIcon size={size} />,
    description: <FileTextIcon size={size} />,
    type: <TagIcon size={size} />,
    tags: <TagIcon size={size} />,
    industry: <BuildingIcon size={size} />,
  };
  return iconMap[fieldName] || <FileTextIcon size={size} />;
};
