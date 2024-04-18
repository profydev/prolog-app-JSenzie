import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "empty-gray",
  error = "error",
  emptyError = "empty-error",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  onClick,
  className,
}: ButtonProps) {
  return (
    <div className={classNames(className)}>
      <button
        className={classNames(styles.button, styles[size], styles[color])}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
