import React, { useEffect, useState } from 'react';
import styles from './ModalAddTask.module.scss';
import CloseIcon from '../../assets/icons/CloseIcon';
import InputApp from '../../ui/InputApp/InputApp';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/projectsReducer';
import SelectApp from '../../ui/SelectApp/SelectApp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useDateFormatter from '../../hooks/dateFormatter';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import CircledPLus from '../../assets/icons/CircledPlus';
import TrashIcon from '../../assets/icons/TrashIcon';

const ModalAddTask = ({ handleClose, id }) => {
    const dispatch = useDispatch();

    const options = [
        { value: '1', label: 'P1', color: 'lightblue' },
        { value: '2', label: 'P2', color: 'pink' },
        { value: '3', label: 'P3', color: '#9c9c9c' },
        { value: 'other', label: 'Другое' },
    ];

    const [taskName, setTaskName] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskName, setSubtaskName] = useState('');
    const [taskNumber, setTaskNumber] = useState(null);

    const startDate = useDateFormatter(new Date());
    const endDate = useDateFormatter(selectedDate);

    const closeModal = () => {
        setTaskName('');
        setDescription('');
        setSelectedDate('');
        setSelected('');
        setSelectedDate('');
        setError('');
        setFiles([]);
        setSubtasks([]);
        handleClose();
    };

    const handleClickBtn = () => {
        dispatch(
            addTask({
                id: taskNumber,
                name: taskName,
                description: description,
                status: 'queue',
                startDate: startDate,
                endDate: endDate,
                epic: selected,
                projectId: id,
                files: files.length > 0 ? files : null,
                subtasks,
                comments: [],
            })
        );
        closeModal();
    };

    const allowedFormats = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'text/plain',
        'application/pdf',
        'application/msword',
    ];

    const handleFileChange = (fileItems) => {
        const validFiles = [];

        fileItems.forEach((fileItem) => {
            if (allowedFormats.includes(fileItem.file.type)) {
                validFiles.push(fileItem.file);
            } else {
                setError(
                    'Можно загружать только .doc, .png, .jpg, .gif, .pdf, .txt'
                );
            }
        });
        console.log('validFiles', validFiles);
        setFiles(validFiles);
    };

    const handleAddSubtask = () => {
        if (subtaskName.trim()) {
            setSubtasks([
                ...subtasks,
                {
                    id: Date.now(),
                    taskId: taskNumber,
                    name: subtaskName.trim(),
                    completed: false,
                },
            ]);
            setSubtaskName('');
        }
    };

    const handleRemoveSubtask = (index) => {
        setSubtasks(subtasks.filter((task) => task.id !== index));
    };

    useEffect(() => {
        setTaskNumber(Date.now());
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // console.log('subtasks', subtasks);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [subtasks]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.closeModal} onClick={closeModal}>
                    <CloseIcon size={20} fill={'white'} />
                </div>

                <div className={styles.modalLabel}>
                    <label>Новая задача</label>
                    <label>{`№ ${taskNumber}`}</label>
                </div>

                {isMobile && (
                    <div className={styles.mobileClose} onClick={closeModal}>
                        <CloseIcon size={20} fill={'black'} />
                    </div>
                )}

                <div className={styles.modalItems}>
                    <div className={styles.inputsContainer}>
                        <InputApp
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder={'Название задачи'}
                            classNameContainer={styles.modalInput}
                        />
                        {!isMobile && (
                            <FilePond
                                files={files}
                                onupdatefiles={handleFileChange}
                                allowMultiple={true}
                                maxFiles={3}
                                labelIdle="Перетащите файл или выберите"
                                className="fileUpload"
                            />
                        )}

                        {error && (
                            <label style={{ color: 'darkred' }}>{error}</label>
                        )}

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Описание задачи"
                            className={styles.textarea}
                        />

                        <div className={styles.subtaskContainer}>
                            <div className={styles.subtaskInput}>
                                <InputApp
                                    value={subtaskName}
                                    onChange={(e) =>
                                        setSubtaskName(e.target.value)
                                    }
                                    classNameContainer={styles.inputContainer}
                                    placeholder="Добавить подзадачу"
                                />
                                <CircledPLus
                                    size={!isMobile ? 45 : 35}
                                    onClick={handleAddSubtask}
                                    className={styles.addButton}
                                    fill={'#3e58eb'}
                                />
                            </div>
                            {subtasks.map((subtask) => (
                                <div
                                    key={subtask.id}
                                    className={styles.subtaskItem}
                                >
                                    <span className={styles.subtaskName}>
                                        {subtask.name}
                                    </span>
                                    <div
                                        className={styles.removeSubtask}
                                        onClick={() =>
                                            handleRemoveSubtask(subtask.id)
                                        }
                                    >
                                        <TrashIcon size={15} fill="red" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.detailsContainer}>
                        <SelectApp
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            placeholder="Эпик"
                            className={styles.modalSelect}
                        />
                        <label>Выполнить до:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Дедлайн"
                            className={styles.datePicker}
                            dateFormat="dd.MM.yyyy"
                        />
                    </div>
                </div>

                <ButtonApp
                    title={'Добавить'}
                    onClick={handleClickBtn}
                    disabled={!taskName}
                />
            </div>
        </div>
    );
};

export default ModalAddTask;
