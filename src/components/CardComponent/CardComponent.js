import React from 'react';
import styles from './CardComponent.module.scss';

const CardComponent = ({ children }) => {
    return <div className={styles.card}>{children}</div>;
};

export default CardComponent;
