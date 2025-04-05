import { FC, ReactNode } from 'react';
import styles from './CardComponent.module.scss';

interface ICardComponentProps {
    children: ReactNode;
}

const CardComponent: FC<ICardComponentProps> = ({ children }) => {
    return <div className={styles.card}>{children}</div>;
};

export default CardComponent;
