"use client";

import Image from "next/image";
import { cn } from "../../lib/utils";
import { EXTERNAL_ASSETS } from "../../lib/constants";

interface SMHLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-auto",
  md: "h-12 w-auto",
  lg: "h-16 w-auto",
};

export function SMHLogo({ size = "md", className }: SMHLogoProps) {
  return (
    <div className={cn("flex items-center justify-center group", className)}>
      <div className="relative">
        <Image
          src={EXTERNAL_ASSETS.SMH_LOGO}
          alt="SMH - Powered by Solana"
          width={size === "sm" ? 120 : size === "md" ? 180 : 240}
          height={size === "sm" ? 32 : size === "md" ? 48 : 64}
          className={cn(
            sizeClasses[size],
            "object-contain opacity-50 hover:opacity-70 transition-all duration-300 group-hover:scale-105"
          )}
          priority={false}
        />

        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm"></div>
      </div>
    </div>
  );
}
