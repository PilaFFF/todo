import { useDroppable } from '@dnd-kit/core';
import styles from './DroppableColumn.module.scss';

const DroppableColumn = ({ id, title, children }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className={styles.column}>
            <label className={styles.columnLabel}>{title}</label>
            {children}
        </div>
    );
};

export default DroppableColumn;
