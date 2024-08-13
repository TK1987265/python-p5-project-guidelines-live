// Action Types
const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
const ADD_EVENT = 'ADD_EVENT';

// Action to fetch events from the API
export const fetchEvents = () => {
    return dispatch => {
        dispatch({ type: FETCH_EVENTS_START });
        fetch('http://localhost:5555/events/')
            .then(response => response.json())
            .then(data => dispatch({ type: FETCH_EVENTS_SUCCESS, payload: data }))
            .catch(error => dispatch({ type: FETCH_EVENTS_FAILURE, payload: error.message }));
    };
};

// Action to add a new event
export const addEvent = (eventData) => {
    return dispatch => {
        fetch('http://localhost:5555/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            dispatch({ type: ADD_EVENT, payload: data });
        })
        .catch(error => {
            dispatch({ type: FETCH_EVENTS_FAILURE, payload: error.message });
        });
    };
};
