export interface Task {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    status: string;
    subtasks: Subtask[];
    comments: IComment[];
    timeSpent?: number;
    startDate?: string;
    endDate?: string;
    epic?: string;
    files?: File[];
}

export interface Subtask {
    id: string;
    taskId: string;
    name: string;
    completed: boolean;
}

export interface IComment {
    id: string;
    text: string;
    time: string;
    author: string;
}

export interface Project {
    id: string;
    name: string;
    tasks: Task[];
}

export interface ProjectsState {
    projects: Project[];
}

const getProjectsList = (): Project[] => {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
};

const initialState: ProjectsState = {
    projects: getProjectsList(),
};

type Action =
    | { type: 'ADD_PROJECT'; payload: Project }
    | { type: 'REMOVE_PROJECT'; payload: string }
    | { type: 'ADD_TASK'; payload: { task: Task } }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'REMOVE_TASK'; payload: string }
    | { type: 'MOVE_TASK'; payload: { taskId: string; newStatus: string } }
    | {
          type: 'UPDATE_SUBTASK_STATUS';
          payload: { taskId: string; updatedSubtask: Subtask };
      }
    | { type: 'ADD_COMMENT'; payload: { taskId: string; comment: IComment } }
    | {
          type: 'REMOVE_COMMENT';
          payload: { taskId: string; commentId: string };
      };

const projectsReducer = (
    state = initialState,
    action: Action
): ProjectsState => {
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
                project.id === action.payload.task.projectId
                    ? {
                          ...project,
                          tasks: [...project.tasks, action.payload.task],
                      }
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
            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? {
                              ...task,
                              comments: [
                                  ...task.comments,
                                  action.payload.comment,
                              ],
                          }
                        : task
                ),
            }));
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            return { ...state, projects: updatedProjects };
        }

        case 'REMOVE_COMMENT': {
            const updatedProjects = state.projects.map((project) => ({
                ...project,
                tasks: project.tasks.map((task) =>
                    task.id === action.payload.taskId
                        ? {
                              ...task,
                              comments: task.comments.filter(
                                  (comment) =>
                                      comment.id !== action.payload.commentId
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

export default projectsReducer;
