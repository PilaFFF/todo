import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectsPage.module.scss';
import CardComponent from '../../components/CardComponent/CardComponent';
import ProjectComponent from '../../components/ProjectComponent/ProjectComponent';
import CircledPLus from '../../assets/icons/CircledPlus';
import ModalAddProject from '../../modal/ModalAddProject/ModalAddProject';
import { Project } from '../../store/projectsReducer';
import { AppDispatch, RootState } from '../../store/typesStore';

const ProjectsPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const projects = useSelector<RootState, Project[]>(
        (state) => state?.projects?.projects
    );

    const [modalVisible, setModalVisible] = useState(false);

    const handlegoToTasks = (id: string) => {
        navigate(`/tasks/${id}`);
    };

    const handleModalVisible = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    const handleRemoveProject = (id: string) => {
        dispatch({ type: 'REMOVE_PROJECT', payload: id });
    };

    return (
        <div className={styles.projectsPage}>
            <ModalAddProject visible={modalVisible} handleClose={handleClose} />
            <CardComponent>
                {projects?.map((project: Project) => (
                    <ProjectComponent
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        onClick={handlegoToTasks}
                        handleRemoveProject={handleRemoveProject}
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
