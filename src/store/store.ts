import { legacy_createStore as createStore, combineReducers } from 'redux';
import projectsReducer from './projectsReducer';

const rootReducer = combineReducers({
    projects: projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
