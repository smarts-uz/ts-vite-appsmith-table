import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";

export type InfoCardVariant = "info" | "warning" | "error" | "success";

interface InfoCardProps {
  title?: string;
  message: string;
  variant?: InfoCardVariant;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  InfoCardVariant,
  { text: string; border: string; bg: string; defaultIcon: React.ReactNode }
> = {
  info: {
    text: "text-blue-700",
    border: "border-blue-300",
    bg: "bg-blue-100/50",
    defaultIcon: "ℹ️",
  },
  warning: {
    text: "text-yellow-800",
    border: "border-yellow-300",
    bg: "bg-yellow-100/50",
    defaultIcon: "⚠️",
  },
  error: {
    text: "text-red-700",
    border: "border-red-400",
    bg: "bg-red-100/30",
    defaultIcon: "❌",
  },
  success: {
    text: "text-green-700",
    border: "border-green-300",
    bg: "bg-green-100/50",
    defaultIcon: "✅",
  },
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  message,
  variant = "info",
  icon,
  className = "",
}) => {
  const styles = variantStyles[variant];

  return (
    <Card
      className={`mx-auto max-w-md mt-8 w-full h-full flex flex-col justify-center border ${styles.border} ${styles.bg} ${className}`}
    >
      <CardHeader
        className={`flex items-center gap-2 font-semibold ${styles.text}`}
      >
        {icon ?? styles.defaultIcon}
        <span>
          {title ?? variant.charAt(0).toUpperCase() + variant.slice(1)}
        </span>
      </CardHeader>
      <CardContent className={`whitespace-normal break-words ${styles.text}`}>{message}</CardContent>
    </Card>
  );
};
