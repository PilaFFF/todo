import { useMemo } from 'react';

const useDateFormatter = (date) => {
    return useMemo(() => {
        if (!(date instanceof Date) || isNaN(date)) return ''; // Проверка на валидную дату

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }, [date]);
};

export default useDateFormatter;
