import React from 'react';
import styles from './TimeTrack.module.scss';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';

const TimeTracker = ({ time, setTime, handleSave }) => {
    const handleChange = (value) => {
        let cleanValue = value.replace(/\D/g, '').slice(0, 3);
        setTime(cleanValue);
    };

    return (
        <div className={styles.timeContainer}>
            <span>Затраченное время: </span>
            <input
                type="text"
                value={time}
                onChange={(e) => handleChange(e.target.value)}
                className={styles.timeInput}
                maxLength="3"
                placeholder="0"
            />
            <span>ч</span>
            <ButtonApp title="Добавить" onClick={handleSave} />
        </div>
    );
};

export default TimeTracker;
