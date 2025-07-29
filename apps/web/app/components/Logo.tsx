"use client";

import Image from "next/image";
import { cn } from "../../lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "dark";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-auto",
  md: "h-10 w-auto",
  lg: "h-12 w-auto",
  xl: "h-16 w-auto",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function Logo({
  size = "md",
  variant = "default",
  showText = true,
  className,
}: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Logo Icon/Image */}
      <div className="relative">
        <Image
          src="/images/sontine-logo.svg"
          alt="Sontine Logo"
          width={
            size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 48 : 64
          }
          height={
            size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 48 : 64
          }
          className={cn(sizeClasses[size], "object-contain")}
          priority
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <span
          className={cn(
            "font-bold font-pixeloid",
            textSizeClasses[size],
            variant === "white" && "text-white",
            variant === "dark" && "text-dark-500",
            variant === "default" && "text-dark-500"
          )}
        >
          Sontine
        </span>
      )}
    </div>
  );
}
