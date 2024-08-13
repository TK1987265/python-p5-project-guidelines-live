// Action Types
const FETCH_MATCHES_START = 'FETCH_MATCHES_START';
const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';
const ADD_MATCH = 'ADD_MATCH';

const initialState = {
    matches: [],
    loading: false,
    error: null
};

const matchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MATCHES_START:
            return { ...state, loading: true, error: null };
        case FETCH_MATCHES_SUCCESS:
            return { ...state, loading: false, matches: action.payload };
        case FETCH_MATCHES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_MATCH:
            return { ...state, matches: [...state.matches, action.payload] };
        default:
            return state;
    }
};

export default matchesReducer;
