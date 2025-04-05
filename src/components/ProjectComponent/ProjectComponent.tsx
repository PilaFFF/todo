import React, { FC } from 'react';
import styles from './ProjectComponent.module.scss';
import TrashIcon from '../../assets/icons/TrashIcon';

export interface IProjectComponentProps {
    id: string;
    name: string;
    onClick: (id: string) => void;
    handleRemoveProject: (id: string) => void;
}

const ProjectComponent: FC<IProjectComponentProps> = ({
    id,
    name,
    onClick,
    handleRemoveProject,
}) => {
    return (
        <div className={styles.projectComponentWrapper}>
            <div className={styles.project} onClick={() => onClick(id)}>
                {name}
            </div>
            <div
                className={styles.removeProject}
                onClick={() => handleRemoveProject(id)}
            >
                <TrashIcon size={20} fill="red" />
            </div>
        </div>
    );
};

export default ProjectComponent;
