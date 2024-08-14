import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, addTeam } from '../actions/teamsActions';
import { fetchWrestlers } from '../actions/wrestlersActions';

const TeamList = () => {
    const dispatch = useDispatch();
    const { teams, loading, error } = useSelector(state => state.teams);
    const { wrestlers } = useSelector(state => state.wrestlers);
    const [newTeamName, setNewTeamName] = useState('');

    useEffect(() => {
        dispatch(fetchTeams());
        dispatch(fetchWrestlers());
    }, [dispatch]);

    const handleAddTeam = (event) => {
        event.preventDefault();
        dispatch(addTeam({ name: newTeamName }));
        setNewTeamName(''); 
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div id="teams-div">
            <h1>Teams</h1>
            <form onSubmit={handleAddTeam} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="New Team Name"
                    style={{ padding: '10px', width: '200px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Add Team</button>
            </form>
            {teams.map(team => (
                <div key={team.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <h2>{team.name}</h2>
                    <ul>
                        {wrestlers.filter(wrestler => wrestler.team_id === team.id).map(wrestler => (
                            <li key={wrestler.id}>
                                {wrestler.name} - {wrestler.age} years old
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TeamList;
