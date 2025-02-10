import { useMemo } from 'react';

const useParseDate = (dateStr) => {
    return useMemo(() => {
        if (!dateStr) return null;

        const [day, month, year] = dateStr.split('.');
        return new Date(`${year}-${month}-${day}T00:00:00Z`);
    }, [dateStr]);
};

export default useParseDate;
