import React, { useEffect, useState } from 'react';
import styles from './ModalAddProject.module.scss';
import CloseIcon from '../../assets/icons/CloseIcon';
import InputApp from '../../ui/InputApp/InputApp';
import ButtonApp from '../../ui/ButtonApp/ButtonApp';
import { useDispatch } from 'react-redux';
import { addProject } from '../../store/projectsReducer';

const ModalAddProject = ({ visible, handleClose }) => {
    const dispatch = useDispatch();

    const [projectName, setProjectName] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const handleClickBtn = () => {
        dispatch(
            addProject({
                id: String(Date.now()),
                name: projectName,
                tasks: [{}],
            })
        );
        handleClose();
        setProjectName('');
    };

    const onChange = (e) => {
        setProjectName(e.target.value);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={visible ? styles.modalOverlay : styles.displayNone}>
            <div className={styles.modal}>
                <div className={styles.closeModal} onClick={handleClose}>
                    <CloseIcon size={20} fill={'white'} />
                </div>

                {isMobile && (
                    <div className={styles.mobileClose} onClick={handleClose}>
                        <CloseIcon size={20} fill={'black'} />
                    </div>
                )}

                <label className={styles.modalh1}>Новый проект</label>

                <InputApp
                    value={projectName}
                    onChange={onChange}
                    label={
                        isMobile
                            ? 'Введите название'
                            : 'Введите название цели или проекта'
                    }
                    classNameContainer={styles.inputContainer}
                    placeholder={'Название ...'}
                />

                <ButtonApp
                    title={'Добавить'}
                    onClick={handleClickBtn}
                    disabled={projectName ? false : true}
                />
            </div>
        </div>
    );
};

export default ModalAddProject;
