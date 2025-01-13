import React, { ChangeEvent } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";

interface InputProps {
  icon?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  icon,
  label,
  disabled,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className={classNames(styles.wrapper)}>
      {label && <p className={classNames(styles.label)}>{label}</p>}
      <div className={classNames(styles.inputWrapper)}>
        <div className={classNames(styles.iconWrapper)}>
          {icon && (
            <img src={icon} alt="icon" className={classNames(styles.icon)} />
          )}
        </div>

        <input
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          type="text"
          onChange={(e) => onChange(e)}
          className={classNames(styles.input, {
            [styles.inputWithIcon]: !!icon,
          })}
        />
      </div>
    </div>
  );
};

export default Input;
