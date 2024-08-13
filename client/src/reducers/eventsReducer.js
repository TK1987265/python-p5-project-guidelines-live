// Action Types
const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
const ADD_EVENT = 'ADD_EVENT';

const initialState = {
    events: [],
    loading: false,
    error: null
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS_START:
            return { ...state, loading: true, error: null };
        case FETCH_EVENTS_SUCCESS:
            return { ...state, loading: false, events: action.payload };
        case FETCH_EVENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_EVENT:
            return { ...state, events: [...state.events, action.payload] };
        default:
            return state;
    }
};

export default eventsReducer;
