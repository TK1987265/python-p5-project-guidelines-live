// teamsReducer.js

// Initial state for the teams
const initialState = {
    loading: false,
    teams: [],
    error: null
};

// Reducer function to handle team actions
const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TEAMS_START':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_TEAMS_SUCCESS':
            return {
                ...state,
                loading: false,
                teams: action.payload,
                error: null
            };
        case 'FETCH_TEAMS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'ADD_TEAM':
            return {
                ...state,
                teams: [...state.teams, action.payload] // Add new team to the list
            };
       
        default:
            return state;
    }
};

export default teamsReducer;
