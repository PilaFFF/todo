import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import styles from './TasksPage.module.scss';
import DraggableTask from '../../components/DraggableTask/DraggableTask';
import DroppableColumn from '../../components/DroppableColumn/DroppableColumn';
import InputApp from '../../ui/InputApp/InputApp';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import ModalAddTask from '../../modal/ModalAddTask/ModalAddTask';
import ModalShowTask from '../../modal/ModalShowTask/ModalShowTask';
import { AppDispatch, RootState } from '../../store/typesStore';
import { Project, Task } from '../../store/projectsReducer';

const TasksPage: FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const columns = {
        queue: 'Очередь',
        in_progress: 'Выполняется',
        done: 'Завершена',
    };

    const projects = useSelector<RootState, Project[]>(
        (state) => state?.projects?.projects
    );

    const currentProject = projects.find((project) => project.id === id);
    const currentTasks = currentProject?.tasks;

    const [searchValue, setSearchValue] = useState<string>('');
    const [modalAddTaskVisible, setModalAddTaskVisible] =
        useState<boolean>(false);
    const [modalShowTaskVisible, setModalShowTaskVisible] =
        useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<Task>();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleClose = () => {
        setModalAddTaskVisible(false);
        setModalShowTaskVisible(false);
    };

    const filteredTasks = currentTasks?.filter(
        (task) =>
            task?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
            task?.id?.toString()?.includes(searchValue)
    );

    const handleAddTask = () => {
        setModalAddTaskVisible(true);
    };

    const handleShowTask = (task: Task) => {
        setSelectedTask(task);
        setModalShowTaskVisible(true);
    };

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = String(active.id);
        const newStatus = String(over.id);
        dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus } });
    };

    useEffect(() => {
        if (modalAddTaskVisible || modalShowTaskVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [modalAddTaskVisible, modalShowTaskVisible]);

    return (
        <div className={styles.tasksPage}>
            {modalAddTaskVisible && (
                <ModalAddTask handleClose={handleClose} id={String(id)} />
            )}

            {modalShowTaskVisible && selectedTask && (
                <ModalShowTask
                    handleClose={handleClose}
                    currentTask={selectedTask}
                    id={String(id)}
                />
            )}

            <div className={styles.searchContainer}>
                <InputApp
                    value={searchValue}
                    onChange={handleSearch}
                    label={'Поиск'}
                    placeholder="по номеру или названию"
                    className={styles.searchInput}
                />
            </div>

            <h2
                className={styles.taskPageLabel}
            >{`"${currentProject?.name}"`}</h2>

            <div className={styles.addTask}>
                <ButtonApp title={'Создать задачу'} onClick={handleAddTask} />
            </div>

            <DndContext
                onDragEnd={onDragEnd}
                collisionDetection={closestCorners}
            >
                <div className={styles.taskBoard}>
                    {Object.keys(columns).map((columnKey) => (
                        <DroppableColumn
                            key={columnKey}
                            id={columnKey}
                            title={columns[columnKey as keyof typeof columns]}
                        >
                            {filteredTasks
                                ?.filter(
                                    (task: Task) => task.status === columnKey
                                )
                                .map((task: Task) => (
                                    <DraggableTask
                                        key={task.id}
                                        task={task}
                                        onClick={() => handleShowTask(task)}
                                    />
                                ))}
                        </DroppableColumn>
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default TasksPage;
