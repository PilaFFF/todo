import { FC } from 'react';
import styles from './ButtonApp.module.scss';

interface IButtonProps {
    title: string;
    onClick: () => void;
    disabled?: boolean;
}

const ButtonApp: FC<IButtonProps> = ({ title, onClick, disabled }) => {
    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
                style={
                    disabled
                        ? { backgroundColor: 'rgba(0, 0, 0, 0.53)' }
                        : undefined
                }
            >
                {title}
            </button>
        </div>
    );
};

export default ButtonApp;
