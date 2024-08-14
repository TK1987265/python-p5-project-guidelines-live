import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches, addMatch } from '../actions/matchesActions';
import { fetchEvents } from '../actions/eventActions'; 

const MatchList = () => {
    const dispatch = useDispatch();
    const { matches, loading, error } = useSelector(state => state.matches);
    const { events } = useSelector(state => state.events);
    const [newMatch, setNewMatch] = useState({ event_id: '', description: '' });

    useEffect(() => {
        dispatch(fetchMatches());
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleAddMatch = (event) => {
        event.preventDefault();
        dispatch(addMatch(newMatch));
        setNewMatch({ event_id: '', description: '' }); 
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div id="matches-div">
            <h1>Matches</h1>
            <form onSubmit={handleAddMatch} style={{ marginBottom: '20px' }}>
                <select
                    value={newMatch.event_id}
                    onChange={(e) => setNewMatch({ ...newMatch, event_id: e.target.value })}
                    style={{ padding: '10px', width: '200px', marginRight: '10px' }}
                >
                    <option value="">Select Event</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>{event.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newMatch.description}
                    onChange={(e) => setNewMatch({ ...newMatch, description: e.target.value })}
                    placeholder="Match Description"
                    style={{ padding: '10px', width: '200px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Add Match</button>
            </form>
            {matches.map(match => (
                <div key={match.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <h2>{match.description}</h2>
                    <p>Event: {events.find(event => event.id === match.event_id)?.name}</p>
                </div>
            ))}
        </div>
    );
};

export default MatchList;
