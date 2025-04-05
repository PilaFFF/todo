import { useDroppable } from '@dnd-kit/core';
import styles from './DroppableColumn.module.scss';
import { FC, ReactElement } from 'react';
import { IDraggableTaskProps } from '../DraggableTask/DraggableTask';

interface IDroppableColumnProps {
    id: string;
    title: string;
    children:
        | ReactElement<IDraggableTaskProps>
        | ReactElement<IDraggableTaskProps>[]
        | undefined
        | null;
}

const DroppableColumn: FC<IDroppableColumnProps> = ({
    id,
    title,
    children,
}) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className={styles.column}>
            <label className={styles.columnLabel}>{title}</label>
            {children}
        </div>
    );
};

export default DroppableColumn;
