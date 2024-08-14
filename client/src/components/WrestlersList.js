

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWrestler, deleteWrestler, updateWrestler, fetchWrestlers } from '../actions/wrestlersActions';
import { fetchTeams } from "../actions/teamsActions";
import WrestlerForm from "./CreateWrestlerForm";

const WrestlersList = () => {
    const dispatch = useDispatch();
    const { wrestlers, loading, error } = useSelector(state => state.wrestlers);
    const { teams } = useSelector(state => state.teams);
    const [currentWrestler, setCurrentWrestler] = useState(null); 

    useEffect(() => {
        dispatch(fetchWrestlers());
        dispatch(fetchTeams());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteWrestler(id));
    };

    const handleEdit = (wrestler) => {
        setCurrentWrestler(wrestler);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div id="wrestlers-div">
            <h1>Wrestlers</h1>
            <WrestlerForm teams={teams} wrestlerData={currentWrestler} onSubmit={(formData) => {
                if (currentWrestler && currentWrestler.id) {
                    dispatch(updateWrestler(currentWrestler.id, {...formData})); 
                    
                } else {
                    
                    dispatch(createWrestler(formData));
                }
                setCurrentWrestler(null);
            }} />
            <ul id="wrestlers-list">
                {wrestlers.map(wrestler => (
                    <li key={wrestler.id}>
                        <img alt="Wrestler" width="200" height="200" src={wrestler.profile_image_url} />
                        <p id="wrestler-name">{wrestler.name} - {wrestler.age}</p>
                        <div class="buttons">
                        <button style={{cursor: "pointer"}} onClick={() => handleEdit(wrestler)}>Edit</button>
                        <button style={{cursor: "pointer"}} onClick={() => handleDelete(wrestler.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WrestlersList;





