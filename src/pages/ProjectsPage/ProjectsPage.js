import React, { useState } from 'react';
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

    return (
        <div className={styles.projectsPage}>
            <ModalAddProject visible={modalVisible} handleClose={handleClose} />
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
                    onClick={handleModalVisible}
                    className={styles.addButton}
                />
            </CardComponent>
        </div>
    );
};

export default ProjectsPage;
