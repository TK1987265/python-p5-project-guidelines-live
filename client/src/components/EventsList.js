import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent } from '../actions/eventActions';

const EventList = () => {
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector(state => state.events);
    const [newEvent, setNewEvent] = useState({ name: '', date: '' });

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleAddEvent = (event) => {
        event.preventDefault();
        dispatch(addEvent(newEvent));
        setNewEvent({ name: '', date: '' }); 
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div id="events-div">
            <h1>Events</h1>
            <form onSubmit={handleAddEvent} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    placeholder="Event Name"
                    style={{ padding: '10px', width: '200px', marginRight: '10px' }}
                />
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="Event Date"
                    style={{ padding: '10px', width: '200px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Add Event</button>
            </form>
            {events.map(event => (
                <div key={event.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <h2>{event.name}</h2>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default EventList;
