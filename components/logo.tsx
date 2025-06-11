interface LogoProps {
  variant?: "dark" | "light"
  className?: string
}

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 3L35 12V28L20 37L5 28V12L20 3Z"
            fill={variant === "dark" ? "#333333" : "#FFFFFF"}
            stroke={variant === "dark" ? "#333333" : "#FFFFFF"}
            strokeWidth="2"
          />
          <path
            d="M20 8L30 14V26L20 32L10 26V14L20 8Z"
            fill={variant === "dark" ? "#F9D94C" : "#F9D94C"}
            stroke={variant === "dark" ? "#333333" : "#FFFFFF"}
            strokeWidth="0.5"
          />
          {/* Neural network dots and lines */}
          <circle cx="15" cy="18" r="1.5" fill={variant === "dark" ? "#333333" : "#333333"} />
          <circle cx="20" cy="15" r="1.5" fill={variant === "dark" ? "#333333" : "#333333"} />
          <circle cx="25" cy="18" r="1.5" fill={variant === "dark" ? "#333333" : "#333333"} />
          <circle cx="17" cy="23" r="1.5" fill={variant === "dark" ? "#333333" : "#333333"} />
          <circle cx="23" cy="23" r="1.5" fill={variant === "dark" ? "#333333" : "#333333"} />
          <path
            d="M15 18L20 15L25 18M15 18L17 23M25 18L23 23M17 23L20 26L23 23"
            stroke={variant === "dark" ? "#333333" : "#333333"}
            strokeWidth="0.75"
          />
        </svg>
      </div>
      <div className={`font-bold text-lg ${variant === "dark" ? "text-black" : "text-white"}`}>
        RightHome<span className="text-[#F9D94C]">AI</span>
      </div>
    </div>
  )
}
