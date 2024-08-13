import React, { useState, useEffect } from 'react';

function WrestlerForm({ teams, wrestlerData, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        team_id: 0, 
        age: '',
        profile_image_url: ''
    });

   
    useEffect(() => {
        if (wrestlerData) {
            setFormData({
                name: wrestlerData.name,
                team_id: wrestlerData.team_id || 0,  
                age: wrestlerData.age || '',
                profile_image_url: wrestlerData.profile_image_url || ''
            });
        }
    }, [wrestlerData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Specialized change handler for team_id
    const handleTeamChange = (event) => {
        const teamId = parseInt(event.target.value, 10); 
        setFormData(prevFormData => ({
            ...prevFormData,
            team_id: teamId
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);  
        console.log("form", formData)
    };


    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px',
        width: 'fit-content'
    };

    const inputStyle = {
        margin: '10px',
        padding: '8px',
        width: '300px',
        borderRadius: '4px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <label style={{ marginBottom: '10px' }}>
                Wrestler Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={{ marginBottom: '10px' }}>
                Team:
                <select name="team_id" value={formData.team_id} onChange={handleTeamChange} style={inputStyle}>
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </label>
            <label style={{ marginBottom: '10px' }}>
                Age:
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={{ marginBottom: '10px' }}>
                Profile Image URL:
                <input
                    type="text"
                    name="profile_image_url"
                    value={formData.profile_image_url}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <button type="submit" style={buttonStyle}>{wrestlerData ? 'Update Wrestler' : 'Add Wrestler'}</button>
        </form>
    );
}

export default WrestlerForm;


