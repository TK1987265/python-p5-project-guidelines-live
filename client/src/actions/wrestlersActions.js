

export const fetchWrestlers = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_WRESTLERS_REQUEST' });
        try {
            const response = await fetch('http://localhost:5555/wrestlers/');
            const data = await response.json();
            dispatch({ type: 'FETCH_WRESTLERS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_WRESTLERS_FAILURE', payload: error.message });
        }
    };
};

export const createWrestler = wrestler => async dispatch => {
    try {
        const response = await fetch('http://localhost:5555/wrestlers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wrestler)
        });
        const data = await response.json();
        dispatch({ type: 'CREATE_WRESTLER_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'WRESTLER_ERROR', payload: error.message });
    }
};

export const deleteWrestler = id => async dispatch => {
    try {
        await fetch(`http://localhost:5555/wrestlers/${id}`, {
            method: 'DELETE'
        });
        dispatch({ type: 'DELETE_WRESTLER_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'WRESTLER_ERROR', payload: error.message });
    }
};

export const updateWrestler = (id, updates) => async dispatch => {
    try {
        const response = await fetch(`http://localhost:5555/wrestlers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });
        const data = await response.json();
        dispatch({ type: 'UPDATE_WRESTLER_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'WRESTLER_ERROR', payload: error.message });
    }
};

