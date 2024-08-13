const initialState = {
    wrestlers: [],
    loading: false,
    error: null,
};

const wrestlersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WRESTLERS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_WRESTLERS_SUCCESS':
            return { ...state, loading: false, wrestlers: action.payload };
        case 'FETCH_WRESTLERS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_WRESTLER_SUCCESS':
            return { ...state, wrestlers: [...state.wrestlers, action.payload] };
        case 'DELETE_WRESTLER_SUCCESS':
            return { ...state, wrestlers: state.wrestlers.filter(wrestler => wrestler.id !== action.payload) };
        case 'UPDATE_WRESTLER_SUCCESS':
            return {
                ...state,
                wrestlers: state.wrestlers.map(wrestler =>
                    wrestler.id === action.payload.id ? action.payload : wrestler
                ),
            };
        case 'WRESTLER_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default wrestlersReducer;
