import React from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";
import { InputHTMLAttributes } from "react";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

export enum CheckboxState {
  unchecked = "unchecked",
  checked = "checked",
  partlyChecked = "partlyChecked",
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checkboxSize?: CheckboxSize;
  checkboxState: CheckboxState;
  className?: string;
  disabled?: boolean;
  label?: string;
}

export function Checkbox({
  checkboxSize = CheckboxSize.md,
  checkboxState = CheckboxState.unchecked,
  className,
  disabled = false,
  label = "label",
  ...props
}: CheckboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate =
        checkboxState === CheckboxState.partlyChecked;
    }
  }, [checkboxState]);

  return (
    <div className={classNames(styles.checkboxContainer, className)}>
      <label
        className={classNames(
          styles.checkboxWrapper,
          styles[checkboxSize],
          disabled && styles.disabled,
        )}
      >
        <input
          ref={inputRef}
          type="checkbox"
          className={classNames(
            styles.checkbox,
            styles[checkboxState],
            styles[checkboxSize],
          )}
          checked={checkboxState === CheckboxState.checked}
          disabled={disabled}
          {...props}
        />
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    </div>
  );
}
