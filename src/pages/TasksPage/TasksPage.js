import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { moveTask } from '../../store/projectsReducer';
import { DndContext, closestCorners } from '@dnd-kit/core';
import styles from './TasksPage.module.scss';
import DraggableTask from '../../components/DraggableTask/DraggableTask';
import DroppableColumn from '../../components/DroppableColumn/DroppableColumn';
import InputApp from '../../ui/InputApp/InputApp';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import ModalAddTask from '../../modal/ModalAddTask/ModalAddTask';
import ModalShowTask from '../../modal/ModalShowTask/ModalShowTask';

const TasksPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { projects } = useSelector((state) => state.projects);

    const currentProject = projects.find((project) => project.id === id);
    const currentTasks = currentProject?.tasks;

    const [searchValue, setSearchValue] = useState('');
    const [modalAddTaskVisible, setModalAddTaskVisible] = useState(false);
    const [modalShowTaskVisible, setModalShowTaskVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(0);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClose = () => {
        setModalAddTaskVisible(false);
        setModalShowTaskVisible(false);
    };

    const filteredTasks = currentTasks?.filter(
        (task) =>
            task.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.id.toString().includes(searchValue)
    );

    const handleAddTask = () => {
        setModalAddTaskVisible(true);
    };

    const handleShowTask = (task) => {
        setSelectedTask(task);
        setModalShowTaskVisible(true);
    };

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = parseInt(active.id);
        const newStatus = over.id;
        dispatch(moveTask(taskId, newStatus));
    };

    const columns = {
        queue: 'Очередь',
        in_progress: 'Выполняется',
        done: 'Завершена',
    };

    return (
        <div className={styles.tasksPage}>
            {modalAddTaskVisible && (
                <ModalAddTask
                    visible={modalAddTaskVisible}
                    handleClose={handleClose}
                    id={id}
                />
            )}

            {modalShowTaskVisible && (
                <ModalShowTask
                    visible={modalShowTaskVisible}
                    handleClose={handleClose}
                    currentTask={selectedTask}
                    id={id}
                />
            )}

            <h2
                className={styles.taskPageLabel}
            >{`"${currentProject?.name}"`}</h2>
            <div className={styles.searchContainer}>
                <InputApp
                    value={searchValue}
                    onChange={handleSearch}
                    label={'Поиск'}
                    placeholder="Введите название или номер задачи"
                    className={styles.searchInput}
                />
            </div>

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
                            title={columns[columnKey]}
                            onClick={handleShowTask}
                        >
                            {filteredTasks
                                .filter((task) => task.status === columnKey)
                                .map((task) => (
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
