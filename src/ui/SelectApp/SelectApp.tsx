import { FC, useState } from 'react';
import styles from './SelectApp.module.scss';
import ArrowDown from '../../assets/icons/ArrowDown';

interface IOption {
    value: string;
    label?: string;
    color?: string;
}

interface ISelectAppProps {
    options: IOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const SelectApp: FC<ISelectAppProps> = ({
    options,
    value,
    onChange,
    placeholder,
    className,
    disabled,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (option: IOption) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className={`${styles.wrapper} ${className || ''}`}>
            <div
                className={styles.select}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className={styles.selectedValue}>
                    {selectedOption ? (
                        <div className={styles.option}>
                            {selectedOption?.color && (
                                <div
                                    className={styles.optionColor}
                                    style={{
                                        backgroundColor: selectedOption?.color,
                                    }}
                                />
                            )}

                            {selectedOption?.label}
                        </div>
                    ) : (
                        placeholder
                    )}
                </div>
                <ArrowDown className={!isOpen ? styles.arrow : styles.active} />
            </div>

            {isOpen && (
                <div className={styles.optionsContainer}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleSelect(option)}
                        >
                            {option?.color && (
                                <div
                                    className={styles.optionColor}
                                    style={{ backgroundColor: option.color }}
                                />
                            )}

                            {option.label || option.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectApp;
