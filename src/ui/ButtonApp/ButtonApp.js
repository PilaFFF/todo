import React from 'react';
import styles from './ButtonApp.module.scss';

const ButtonApp = ({ title, onClick, disabled }) => {
    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
                style={
                    disabled ? { backgroundColor: 'rgba(0, 0, 0, 0.53)' } : null
                }
            >
                {title}
            </button>
        </div>
    );
};

export default ButtonApp;
