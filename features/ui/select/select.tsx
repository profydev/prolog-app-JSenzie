import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

interface IOption {
  value: string;
  label: string;
}

interface SelectProps {
  options?: IOption[];
  icon?: string;
  label?: string;
  hint?: string;
  error?: string;
}

export function Select({
  options = [],
  icon,
  label,
  hint,
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | undefined>(
    options[0],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      {label && <p className={styles.selectLabel}>{label}</p>}
      <div className={classNames(styles.selectWrapper, error && styles.error)}>
        <button
          type="button"
          className={classNames(styles.select, {
            [styles.invalid]: selectedOption?.value === "",
          })}
          onClick={() => setIsOpen(!isOpen)}
          data-open={isOpen}
        >
          {icon && <img src={icon} alt="icon" className={styles.icon} />}
          {selectedOption?.label}
        </button>

        <img
          src="/icons/Chevron.png"
          alt="Toggle dropdown"
          className={classNames(styles.chevron, {
            [styles.open]: isOpen,
          })}
        />

        {isOpen && (
          <div className={styles.dropdown}>
            {options.map((option) => (
              <div
                key={option.value}
                className={classNames(styles.option, {
                  [styles.selected]: option.value === selectedOption?.value,
                })}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                <span
                  className={classNames({
                    [styles.invalid]: option.value === "",
                  })}
                >
                  {option.label}
                </span>
                {option.value === selectedOption?.value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={styles.checkIcon}
                  >
                    <path
                      d="M16.6668 5L7.50016 14.1667L3.3335 10"
                      stroke="#7F56D9"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Select;
