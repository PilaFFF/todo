const getProjectsList = () => {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
};

const initialState = {
    projects: getProjectsList(),
};

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT': {
            const newProjects = [
                ...state.projects,
                { ...action.payload, tasks: [] },
            ];
            localStorage.setItem('projects', JSON.stringify(newProjects));
            return { ...state, projects: newProjects };
        }

        case 'REMOVE_PROJECT': {
            const updatedProjects = state.projects.filter(
                (project) => project.id !== action.payload
            );
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'ADD_TASK': {
            const updatedProjects = state.projects.map((project) =>
                project.id === action.payload.projectId
                    ? { ...project, tasks: [...project.tasks, action.payload] }
                    : project
            );
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'UPDATE_TASK': {
            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, ...action.payload }
                        : task
                ),
            }));
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'REMOVE_TASK': {
            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.filter(
                    (task) => task.id !== action.payload
                ),
            }));
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'MOVE_TASK': {
            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? { ...task, status: action.payload.newStatus }
                        : task
                ),
            }));
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'UPDATE_SUBTASK_STATUS': {
            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? {
                              ...task,
                              subtasks: task.subtasks.map((subtask) =>
                                  subtask.id ===
                                  action.payload.updatedSubtask.id
                                      ? action.payload.updatedSubtask
                                      : subtask
                              ),
                          }
                        : task
                ),
            }));
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'ADD_COMMENT': {
            const { taskId, comment } = action.payload;

            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.map((task) =>
                    task.id === taskId
                        ? {
                              ...task,
                              comments: [...task.comments, comment],
                          }
                        : task
                ),
            }));
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'REMOVE_COMMENT': {
            const { taskId, commentId } = action.payload;

            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.map((task) =>
                    task.id === taskId
                        ? {
                              ...task,
                              comments: task.comments.filter(
                                  (comment) => comment.id !== commentId
                              ),
                          }
                        : task
                ),
            }));

            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        default:
            return state;
    }
};

export const addProject = (project) => ({
    type: 'ADD_PROJECT',
    payload: project,
});

export const removeProject = (projectId) => ({
    type: 'REMOVE_PROJECT',
    payload: projectId,
});

export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
});

export const updateTask = (updatedTask) => ({
    type: 'UPDATE_TASK',
    payload: updatedTask,
});

export const removeTask = (taskId) => ({
    type: 'REMOVE_TASK',
    payload: taskId,
});

export const moveTask = (taskId, newStatus) => ({
    type: 'MOVE_TASK',
    payload: { taskId, newStatus },
});

export const updateSubtaskStatus = (updatedSubtask) => ({
    type: 'UPDATE_SUBTASK_STATUS',
    payload: updatedSubtask,
});

export const addComment = (taskId, comment) => ({
    type: 'ADD_COMMENT',
    payload: { taskId, comment },
});

export const removeComment = (taskId, commentId) => ({
    type: 'REMOVE_COMMENT',
    payload: { taskId, commentId },
});

export default projectsReducer;
