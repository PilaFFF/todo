import React from 'react';
import styles from './ProjectComponent.module.scss';
import TrashIcon from '../../assets/icons/TrashIcon';
const ProjectComponent = ({ name, onClick, handleRemoveProject }) => {
    return (
        <div className={styles.projectComponentWrapper}>
            <div className={styles.project} onClick={onClick}>
                {name}
            </div>
            <div className={styles.removeProject} onClick={handleRemoveProject}>
                <TrashIcon size={20} fill="red" />
            </div>
        </div>
    );
};

export default ProjectComponent;
