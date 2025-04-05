import { useDraggable } from '@dnd-kit/core';
import styles from './DraggableTask.module.scss';
import FullIcon from '../../assets/icons/FullIcon';
import { Task } from '../../store/projectsReducer';
import { FC } from 'react';

export interface IDraggableTaskProps {
    task: Task;
    onClick: (task: Task) => void;
}

const DraggableTask: FC<IDraggableTaskProps> = ({ task, onClick }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id.toString(),
    });

    const handleClick = () => onClick(task);

    return (
        <div ref={setNodeRef} className={styles.draggableContainer}>
            <div className={styles.draggableIcon} onClick={handleClick}>
                <FullIcon
                    size={25}
                    fill="black"
                    className={styles.draggableIconItem}
                />
            </div>
            <div
                {...listeners}
                {...attributes}
                className={styles.taskCard}
                style={{
                    transform: transform
                        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                        : undefined,
                }}
            >
                {task.title}
            </div>
        </div>
    );
};

export default DraggableTask;
