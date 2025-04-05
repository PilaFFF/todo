import { FC, useEffect, useState } from 'react';
import styles from './ModalAddTask.module.scss';
import CloseIcon from '../../assets/icons/CloseIcon';
import InputApp from '../../ui/InputApp/InputApp';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import { useDispatch } from 'react-redux';
import SelectApp from '../../ui/SelectApp/SelectApp';
import useDateFormatter from '../../hooks/dateFormatter';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import CircledPLus from '../../assets/icons/CircledPlus';
import TrashIcon from '../../assets/icons/TrashIcon';
import { AppDispatch } from '../../store/typesStore';
import { FilePondFile } from 'filepond';
import { Subtask } from '../../store/projectsReducer';
import { DatePicker, DatePickerProps } from 'antd';

interface IModalAddTaskProps {
    handleClose: () => void;
    id: string;
}

const ModalAddTask: FC<IModalAddTaskProps> = ({ handleClose, id }) => {
    const dispatch = useDispatch<AppDispatch>();

    const options = [
        { value: '1', label: 'P1', color: 'lightblue' },
        { value: '2', label: 'P2', color: 'pink' },
        { value: '3', label: 'P3', color: '#9c9c9c' },
        { value: 'other', label: 'Другое' },
    ];

    const [taskName, setTaskName] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const [description, setDescription] = useState<string>('');
    const [selected, setSelected] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState([]);
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [subtaskName, setSubtaskName] = useState<string>('');
    const [taskNumber, setTaskNumber] = useState<string>('');

    const startDate = useDateFormatter(new Date());
    const endDate = selectedDate;

    const closeModal = () => {
        setTaskName('');
        setDescription('');
        setSelectedDate('');
        setSelected('');
        setSelectedDate('');
        setError([]);
        setFiles([]);
        setSubtasks([]);
        handleClose();
    };

    const handleClickBtn = () => {
        dispatch({
            type: 'ADD_TASK',
            payload: {
                task: {
                    id: taskNumber,
                    projectId: id,
                    title: taskName,
                    description: description,
                    status: 'queue',
                    startDate: startDate,
                    endDate: endDate,
                    epic: selected,
                    files: files.length > 0 ? files : [],
                    subtasks: subtasks,
                    comments: [],
                },
            },
        });
        closeModal();
    };

    const handlePickDate: DatePickerProps['onChange'] = (dateString) => {
        setSelectedDate(String(dateString));
    };

    const handleFileChange = (fileItems: FilePondFile[]) => {
        const validFiles = fileItems.map((fileItem) => fileItem.file) as File[];

        console.log('validFiles', validFiles);
        setFiles(validFiles);
    };

    const handleAddSubtask = () => {
        if (subtaskName.trim()) {
            setSubtasks([
                ...subtasks,
                {
                    id: String(Date.now()),
                    taskId: taskNumber,
                    name: subtaskName.trim(),
                    completed: false,
                },
            ]);
            setSubtaskName('');
        }
    };

    const handleRemoveSubtask = (index: number) => {
        setSubtasks(subtasks.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setTaskNumber(String(Date.now()));
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
                                acceptedFileTypes={[
                                    'image/png',
                                    'image/jpeg',
                                    'image/gif',
                                    'application/pdf',
                                    'text/plain',
                                    'application/msword',
                                ]}
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
                            {subtasks.map((subtask, index) => (
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
                                            handleRemoveSubtask(index)
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
                        <div>
                            <label>Выполнить до: </label>
                            <DatePicker
                                style={{
                                    backgroundColor: '#dadfdf',
                                    borderColor: '#ccc',
                                }}
                                onChange={handlePickDate}
                            />
                        </div>
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
