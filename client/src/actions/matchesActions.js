// Action Types
const FETCH_MATCHES_START = 'FETCH_MATCHES_START';
const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';
const ADD_MATCH = 'ADD_MATCH';

export const fetchMatches = () => {
    return dispatch => {
        dispatch({ type: FETCH_MATCHES_START });
        fetch('http://localhost:5555/matches/')
            .then(response => response.json())
            .then(data => dispatch({ type: FETCH_MATCHES_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: FETCH_MATCHES_FAILURE, payload: error.message }));
    };
};

export const addMatch = (matchData) => {
    return dispatch => {
        fetch('http://localhost:5555/matches/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(matchData)
        })
        .then(response => response.json())
        .then(data => {
            dispatch({ type: ADD_MATCH, payload: data });
        })
        .catch(error => {
            dispatch({ type: FETCH_MATCHES_FAILURE, payload: error.message });
        });
    };
};
