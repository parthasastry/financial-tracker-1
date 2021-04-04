export default (state, action) => {
    switch(action.type){
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.payload
            }
        case 'GET_PROJECT_DETAILS':
            return {
                ...state,
                selectedProject: state.projects.filter(p => p.project_name === action.payload.payload)
            }
        default:
            return state;
    }
}