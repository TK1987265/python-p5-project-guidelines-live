import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; 
import wrestlersReducer from './reducers/wrestlersReducer';
import teamsReducer from './reducers/teamsReducer';
import eventsReducer from './reducers/eventsReducer';
import matchesReducer from './reducers/matchesReducer';

const store = configureStore({
    reducer: {
        wrestlers: wrestlersReducer,
        teams: teamsReducer,
        events: eventsReducer,
        matches: matchesReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk) // Use thunk directly
});

export default store;
