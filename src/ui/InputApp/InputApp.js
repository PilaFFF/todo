import React from 'react';
import styles from './InputApp.module.scss';

const InputApp = ({
    value,
    onChange,
    placeholder,
    label,
    type,
    className,
    classNameContainer,
    disabled,
    handleKeyDown,
}) => {
    return (
        <div className={`${styles.wrapper} ${className || ''}`}>
            {label && (
                <label className={styles.label} htmlFor="input-id">
                    {label}
                </label>
            )}
            <div className={`${styles.container} ${classNameContainer}`}>
                <input
                    id="input-id"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={styles.input}
                    onKeyDown={handleKeyDown}
                    type={type ? type : 'text'}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default InputApp;
