"use client";

import { LoadingOutlined } from "@ant-design/icons";
import * as React from "react";

// Define the button types based on Ant Design's button types
type ButtonType = "primary" | "default" | "dashed" | "link" | "text";
type ButtonSize = "large" | "middle" | "small";
type ButtonShape = "default" | "circle" | "round";
type ButtonColor =
  | "primary"
  | "default"
  | "danger"
  | "blue"
  | "purple"
  | "cyan"
  | "green"
  | "magenta"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "volcano"
  | "geekblue"
  | "lime"
  | "gold";

// Custom variants
type CustomVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "light";

// Custom sizes
type CustomSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps {
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  customSize?: CustomSize;
  shape?: ButtonShape;
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  ghost?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  href?: string;
  htmlType?: "button" | "submit" | "reset";
  color?: ButtonColor;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
  variant?: CustomVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      type = "default",
      size,
      customSize = "default",
      shape,
      loading = false,
      children,
      disabled,
      danger = false,
      ghost = false,
      block = false,
      icon,
      href,
      htmlType = "button",
      color,
      onClick,
      style = {},
      variant = "default",
      ...props
    },
    ref
  ) => {
    // Define variant styles
    const variantStyles: Record<CustomVariant, string> = {
      default:
        "bg-emerald text-white hover:bg-emerald/80 transition-colors duration-200 font-sans",
      primary:
        "bg-blue text-white hover:bg-blue/80 transition-colors duration-200 font-sans font-semibold",
      secondary:
        "bg-slate-700 text-white hover:bg-slate-600 transition-colors duration-200 font-sans",
      destructive:
        "bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 font-sans",
      outline:
        "border border-solid bg-transparent border-emerald text-emerald hover:bg-emerald/10 transition-colors duration-200 font-sans",
      ghost:
        "bg-transparent hover:bg-white/10 text-white transition-colors duration-200 font-sans",
      link: "text-emerald hover:text-emerald/80 underline-offset-4 hover:underline transition-colors duration-200 font-sans",
      light: "bg-white text-navy hover:bg-white/90 transition-colors duration-200 font-sans",
    };

    // Define size styles
    const sizeStyles: Record<CustomSize, string> = {
      default: "h-10 rounded-md px-4 py-2",
      sm: "text-xs btn-sm h-8 rounded-md px-3 gap-1",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10 rounded-md",
    };

    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-0 focus:ring-0 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative";

    // Combine all styles
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[customSize]} ${className} cursor-pointer`;

    // For custom styling, we'll use a regular button instead of AntButton.
    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        onClick={onClick}
        style={style}
        type={htmlType}
        {...props}
      >
        <div className={loading ? "invisible" : "flex items-center gap-2"}>
          {icon && <span className="mr-1">{icon}</span>}
          {children}
        </div>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <LoadingOutlined spin style={{ fontSize: "1rem" }} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
