const FETCH_TEAMS_START = 'FETCH_TEAMS_START';
const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE';
const ADD_TEAM = 'ADD_TEAM';
const UPDATE_TEAM = 'UPDATE_TEAM';

export const fetchTeams = () => {
    return dispatch => {
        dispatch({ type: FETCH_TEAMS_START });
        fetch('http://localhost:5555/teams/')
            .then(response => response.json())
            .then(data => dispatch({ type: FETCH_TEAMS_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: FETCH_TEAMS_FAILURE, payload: error.message }));
    };
};

export const addTeam = (teamData) => {
    return dispatch => {
        fetch('http://localhost:5555/teams/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData)
        })
        .then(response => response.json())
        .then(data => {
            dispatch({ type: ADD_TEAM, payload: data });
        })
        .catch(error => {
            dispatch({ type: FETCH_TEAMS_FAILURE, payload: error.message });
        });
    };
};

