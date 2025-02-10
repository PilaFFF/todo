import React from 'react';
import { useRoutes } from 'react-router-dom';
import ProjectsPage from '../pages/ProjectsPage/ProjectsPage';
import TasksPage from '../pages/TasksPage/TasksPage';

export default function AppRoutes() {
    const routes = useRoutes([
        {
            path: '/',
            element: <ProjectsPage />,
            index: true,
        },
        {
            path: '/tasks/:id',
            element: <TasksPage />,
            index: true,
        },
    ]);
    return routes;
}
