import React, { useEffect, useState } from 'react';
import styles from './ModalShowTask.module.scss';
import CloseIcon from '../../assets/icons/CloseIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import SendMessage from '../../assets/icons/SendMessage';
import CircledPLus from '../../assets/icons/CircledPlus';
import InputApp from '../../ui/InputApp/InputApp';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import { useDispatch } from 'react-redux';
import {
    updateTask,
    removeTask,
    updateSubtaskStatus,
    addComment,
    removeComment,
} from '../../store/projectsReducer';
import SelectApp from '../../ui/SelectApp/SelectApp';
import DatePicker from 'react-datepicker';
import useDateFormatter from '../../hooks/dateFormatter';
import CheckBox from '../../ui/CheckBox/CheckBox';
import TimeTracker from '../../components/TimeTrack/TimeTrack';
import Comment from '../../components/Comment/Comment';
import useTimeFormatter from '../../hooks/timeFormatter';
import useParseDate from '../../hooks/parseDate';

const ModalShowTask = ({ handleClose, currentTask, id }) => {
    const dispatch = useDispatch();

    let labelColor =
        currentTask?.status === 'in_progress'
            ? 'orange'
            : currentTask?.status === 'queue'
            ? '#3e58eb'
            : currentTask?.status === 'done'
            ? '#22bb04'
            : null;

    const options = [
        { value: '1', label: 'P1', color: 'lightblue' },
        { value: '2', label: 'P2', color: 'pink' },
        { value: '3', label: 'P3', color: '#9c9c9c' },
        { value: 'other', label: 'Другое' },
    ];

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskName, setTaskName] = useState(currentTask?.name || '');
    const [description, setDescription] = useState(
        currentTask?.description || ''
    );
    const [selected, setSelected] = useState(currentTask?.epic || '');
    const [selectedDate, setSelectedDate] = useState(
        currentTask?.endDate || null
    );
    const [files, setFiles] = useState(currentTask?.files || []);
    const [subtasks, setSubtasks] = useState(currentTask?.subtasks || []);
    const [subtaskName, setSubtaskName] = useState('');
    const [timeSpent, setTimeSpent] = useState(currentTask?.timeSpent || '');
    const [comments, setComments] = useState(currentTask?.comments || []);
    const [commentValue, setCommentValue] = useState('');

    const startDate = useDateFormatter(new Date());
    const endDate = useDateFormatter(selectedDate);
    const currentTaskEndDate = useParseDate(currentTask?.endDate);
    const currTime = useTimeFormatter(new Date());

    const closeModal = () => {
        setIsEditMode(false);
        handleClose();
    };

    const cropFileName = (name, maxLength = 20) => {
        if (name?.length > maxLength) {
            return name?.substring(0, maxLength) + '...';
        }
        return name;
    };

    const handleSave = () => {
        dispatch(
            updateTask({
                id: currentTask?.id,
                name: taskName,
                description,
                startDate: startDate,
                endDate: endDate,
                epic: selected,
                projectId: id,
                timeSpent,
                subtasks,
                comments,
            })
        );
        setIsEditMode(false);
    };

    const handleRemove = () => {
        dispatch(removeTask(currentTask?.id));
        setIsEditMode(false);
        handleClose();
    };

    const handleAddSubtask = () => {
        if (subtaskName.trim()) {
            setSubtasks([
                ...subtasks,
                {
                    id: Date.now(),
                    taskId: currentTask?.id,
                    name: subtaskName.trim(),
                    completed: false,
                },
            ]);
            setSubtaskName('');
        }
    };

    const handleToggleSubtask = (id) => {
        const index = subtasks.findIndex((subtask) => subtask.id === id);
        if (index !== -1) {
            const updatedSubtasks = [...subtasks];
            updatedSubtasks[index] = {
                ...updatedSubtasks[index],
                completed: !updatedSubtasks[index].completed,
            };
            setSubtasks(updatedSubtasks);

            const updatedSubtask = updatedSubtasks[index];
            dispatch(
                updateSubtaskStatus({ taskId: currentTask.id, updatedSubtask })
            );
        }
    };

    const handleRemoveSubtask = (index) => {
        setSubtasks(subtasks.filter((item) => item.id !== index));
    };

    const handleSendComment = () => {
        if (!commentValue.trim()) return;

        const comment = {
            id: Date.now(),
            text: commentValue,
            author: 'User',
            time: currTime,
            taskId: currentTask?.id,
        };

        setComments([...comments, comment]);
        dispatch(addComment(currentTask?.id, comment));
        setCommentValue('');
    };

    const handleRemoveComment = (id) => {
        setComments(comments.filter((comment) => comment.id !== id));
        dispatch(removeComment(currentTask?.id, id));
        setCommentValue('');
    };

    useEffect(() => {
        if (currentTask) {
            setTaskName(currentTask?.name);
            setDescription(currentTask?.description);
            setSelected(currentTask?.epic);
            setSelectedDate(currentTaskEndDate || '');
            setFiles(currentTask?.files || []);
            setSubtasks(currentTask?.subtasks || []);
            setTimeSpent(currentTask?.timeSpent || '');
            setComments(currentTask?.comments || []);
        }
        console.log('Таск в модалке:', currentTask);
    }, [currentTask]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.commentsSection}>
                    <div className={styles.commentsItems}>
                        {comments?.map((comment) => {
                            return (
                                <div key={comment?.id}>
                                    <Comment
                                        comment={comment}
                                        handleRemove={() =>
                                            handleRemoveComment(comment?.id)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.commentsInputContainer}>
                        <InputApp
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Комментарий ..."
                            classNameContainer={styles.commentInput}
                        />
                        <div
                            className={styles.sendMessage}
                            onClick={handleSendComment}
                        >
                            <SendMessage size={40} />
                        </div>
                    </div>
                </div>
                <div className={styles.modal}>
                    <div className={styles.closeModal} onClick={closeModal}>
                        <CloseIcon size={20} fill={'white'} />
                    </div>

                    <div className={styles.modalLabel}>
                        <label>{`Задача № ${currentTask?.id}`}</label>
                        <label>{`Создана: ${currentTask?.startDate}`}</label>
                    </div>

                    {isMobile && (
                        <div
                            className={styles.mobileClose}
                            onClick={closeModal}
                        >
                            <CloseIcon size={20} fill={'black'} />
                        </div>
                    )}

                    <div className={styles.modalItems}>
                        <div className={styles.inputsContainer}>
                            <div className={styles.inputsContainerTitle}>
                                <InputApp
                                    value={taskName}
                                    onChange={(e) =>
                                        setTaskName(e.target.value)
                                    }
                                    placeholder="Название задачи"
                                    classNameContainer={styles.modalInput}
                                    disabled={!isEditMode}
                                />
                                <label
                                    style={{
                                        color: labelColor,
                                        borderColor: labelColor,
                                    }}
                                >
                                    {currentTask?.status === 'in_progress'
                                        ? 'Выполняется'
                                        : currentTask?.status === 'queue'
                                        ? 'В очереди'
                                        : currentTask?.status === 'done'
                                        ? 'Завершена'
                                        : null}
                                </label>
                            </div>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Описание задачи"
                                className={styles.textarea}
                                disabled={!isEditMode}
                            />
                            {subtasks && (
                                <div className={styles.subtaskContainer}>
                                    <label
                                        className={styles.subtaskContainerLabel}
                                    >
                                        Подзадачи:
                                    </label>
                                    {subtasks?.map((subtask, index) => (
                                        <div
                                            key={index}
                                            className={styles.subtaskItem}
                                        >
                                            <CheckBox
                                                checked={subtask?.completed}
                                                onChange={() =>
                                                    handleToggleSubtask(
                                                        subtask?.id
                                                    )
                                                }
                                            />
                                            <span
                                                className={styles.subtaskName}
                                            >
                                                {subtask.name}
                                            </span>
                                            {isEditMode && (
                                                <div
                                                    className={
                                                        styles.removeSubtask
                                                    }
                                                    onClick={() =>
                                                        handleRemoveSubtask(
                                                            subtask.id
                                                        )
                                                    }
                                                >
                                                    <TrashIcon
                                                        size={15}
                                                        fill="red"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {isEditMode && (
                                        <div className={styles.subtaskInput}>
                                            <InputApp
                                                value={subtaskName}
                                                onChange={(e) =>
                                                    setSubtaskName(
                                                        e.target.value
                                                    )
                                                }
                                                classNameContainer={
                                                    styles.inputContainer
                                                }
                                                placeholder="Добавить подзадачу"
                                            />
                                            <CircledPLus
                                                size={!isMobile ? 45 : 35}
                                                onClick={handleAddSubtask}
                                                className={styles.addButton}
                                                fill={'#3e58eb'}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={styles.detailsContainer}>
                            <SelectApp
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                placeholder="Эпик"
                                className={styles.modalSelect}
                                disabled={!isEditMode}
                            />
                            <label>Выполнить до:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                placeholderText="Дедлайн"
                                className={styles.datePicker}
                                dateFormat="dd.MM.yyyy"
                                disabled={!isEditMode}
                            />
                            {files.length > 0 && (
                                <div className={styles.filePreview}>
                                    <label>Прилагается:</label>
                                    {files.map((file, index) => (
                                        <a
                                            key={index}
                                            href={`/uploads/${file.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.fileName}
                                        >
                                            {cropFileName(file.name, 10)}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <TimeTracker
                            time={timeSpent}
                            setTime={setTimeSpent}
                            handleSave={handleSave}
                        />
                    </div>

                    <div className={styles.buttonsContainer}>
                        <ButtonApp
                            title={
                                isEditMode
                                    ? 'Сохранить изменения'
                                    : 'Редактировать'
                            }
                            onClick={
                                isEditMode
                                    ? handleSave
                                    : () => setIsEditMode(true)
                            }
                        />
                        <div className={styles.trash} onClick={handleRemove}>
                            <TrashIcon size={30} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalShowTask;
