import React from "react";
import styles from "./input.module.scss";
import classNames from "classnames";

interface InputProps {
  icon: string;
  label: string;
  disabled: boolean;
}

export const Input = ({ icon, label, disabled }: InputProps) => {
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
          type="text"
          className={classNames(styles.input, {
            [styles.inputWithIcon]: !!icon,
          })}
        />
      </div>
    </div>
  );
};

export default Input;
