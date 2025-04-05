import { FC } from 'react';
import styles from './TimeTrack.module.scss';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';

interface ITimeTrackerProps {
    time: number;
    setTime: (cleanValue: number) => void;
    handleSave: () => void;
}

const TimeTracker: FC<ITimeTrackerProps> = ({ time, setTime, handleSave }) => {
    const handleChange = (value: string) => {
        const cleanValue = value.replace(/\D/g, '').slice(0, 3);
        const numeric = Number(cleanValue);
        setTime(isNaN(numeric) ? 0 : numeric);
    };

    return (
        <div className={styles.timeContainer}>
            <div>
                <span>Затраченное время: </span>
                <input
                    type="tel"
                    value={String(time)}
                    onChange={(e) => handleChange(e.target.value)}
                    className={styles.timeInput}
                    maxLength={3}
                    placeholder="0"
                />
                <span>ч</span>
            </div>

            <ButtonApp title="Добавить" onClick={handleSave} />
        </div>
    );
};

export default TimeTracker;
