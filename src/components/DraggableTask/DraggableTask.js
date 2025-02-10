import { useDraggable } from '@dnd-kit/core';
import styles from './DraggableTask.module.scss';
import FullIcon from '../../assets/icons/FullIcon';

const DraggableTask = ({ task, onClick }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id.toString(),
    });

    return (
        <div ref={setNodeRef} className={styles.draggableContainer}>
            <div className={styles.draggableIcon} onClick={onClick}>
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
                {task.name}
            </div>
        </div>
    );
};

export default DraggableTask;
