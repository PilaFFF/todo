import React from 'react';
import styles from './CheckBox.module.scss';

const CheckBox = ({ checked, onChange, className }) => {
    return (
        <label className={`${styles.container} ${className || ''}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={styles.hiddenCheckbox}
            />
            <span className={styles.customCheckbox}></span>
        </label>
    );
};

export default CheckBox;
