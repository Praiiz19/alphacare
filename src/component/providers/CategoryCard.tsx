import { cn } from "@/lib/utils";
import {
  Stethoscope,
  Heart,
  Smile,
  Eye,
  Brain,
  Bone,
  Baby,
  Pill,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  icon: string;
  isActive?: boolean;
  onClick?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  heart: Heart,
  smile: Smile,
  eye: Eye,
  brain: Brain,
  bone: Bone,
  baby: Baby,
  pill: Pill,
};

export function CategoryCard({
  name,
  icon,
  isActive,
  onClick,
}: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Stethoscope;
  const navigate = useNavigate();
  const handleClick = () => {
    const slug = name.toLowerCase();
    navigate(`/category/${slug}`);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "category-pill min-w-[100px]",
        isActive && "active"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-primary"
        )}
      >
        <IconComponent className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </button>
  );
}
