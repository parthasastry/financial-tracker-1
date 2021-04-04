import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
    projects: [],
    selectedProject: {}
}

//Create Context
export const GlobalContext = createContext(initialState);

//Provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function setProjects(data) {
        dispatch({
            type: "SET_PROJECTS",
            payload: data.payload
        })
    }

    function getProjectDetails(project) {
        dispatch({
            type: "GET_PROJECT_DETAILS",
            payload: project
        })
    }

    return (
        <GlobalContext.Provider value={{
            projects: state.projects,
            selectedProject: state.selectedProject,
            setProjects,
            getProjectDetails
        }}>
            {children}
        </GlobalContext.Provider>
    )
}