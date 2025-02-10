import React, { useEffect, useState } from 'react';
import styles from './ProjectsPage.module.scss';
import CardComponent from '../../components/CardComponent/CardComponent';
import ProjectComponent from '../../components/ProjectComponent/ProjectComponent';
import CircledPLus from '../../assets/icons/CircledPlus';
import ModalAddProject from '../../modal/ModalAddProject/ModalAddProject';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeProject } from '../../store/projectsReducer';

const ProjectsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { projects } = useSelector((state) => state.projects);

    const [modalVisible, setModalVisible] = useState(false);
    const [cardOffsetX, setCardOffsetX] = useState(0);
    const [cardOffsetY, setCardOffsetY] = useState(0);

    const handlegoToTasks = (id) => {
        navigate(`/tasks/${id}`);
    };

    const handleModalVisible = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    const handleRemoveProject = (id) => {
        dispatch(removeProject(id));
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { innerWidth, innerHeight } = window;

            const cardX = (event.clientX / innerWidth - 0.5) * 10;
            const cardY = (event.clientY / innerHeight - 0.5) * 10;

            setCardOffsetX(cardX);
            setCardOffsetY(cardY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={styles.projectsPage}>
            <ModalAddProject visible={modalVisible} handleClose={handleClose} />
            <div
                className={styles.projectCard}
                style={{
                    transform: `translate(${cardOffsetX}px, ${cardOffsetY}px)`,
                }}
            >
                <CardComponent>
                    {projects?.map((project) => (
                        <ProjectComponent
                            name={project?.name}
                            onClick={() => handlegoToTasks(project?.id)}
                            handleRemoveProject={() =>
                                handleRemoveProject(project?.id)
                            }
                        />
                    ))}

                    <CircledPLus
                        size={50}
                        fill={'gray'}
                        onClick={handleModalVisible}
                        className={styles.addButton}
                    />
                </CardComponent>
            </div>
        </div>
    );
};

export default ProjectsPage;
