import { useMemo } from 'react';

const useTimeFormatter = (date: Date): string => {
    return useMemo(() => {
        if (!(date instanceof Date) || isNaN(date.getTime())) return '';

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    }, [date]);
};

export default useTimeFormatter;
