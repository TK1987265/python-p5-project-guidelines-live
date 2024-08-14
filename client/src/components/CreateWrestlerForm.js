
import React, { useState, useEffect } from 'react';

function WrestlerForm({ teams, wrestlerData, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        team_id: teams.length > 0 ? teams[0].id : '',  
        age: '',
        profile_image_url: ''
    });
    const [errors, setErrors] = useState({});

    
    useEffect(() => {
        if (wrestlerData) {
            setFormData({
                name: wrestlerData.name,
                team_id: wrestlerData.team_id,
                age: wrestlerData.age || '',
                profile_image_url: wrestlerData.profile_image_url || ''
            });
        } else if (teams.length > 0) {
            
            setFormData(prevFormData => ({
                ...prevFormData,
                team_id: teams[0].id
            }));
        }
    }, [wrestlerData, teams]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleTeamChange = (event) => {
        const teamId = parseInt(event.target.value, 10);
        setFormData(prevFormData => ({
            ...prevFormData,
            team_id: teamId
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.team_id) newErrors.team_id = 'Team is required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.profile_image_url) newErrors.profile_image_url = 'Profile image URL is required';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit(formData);
            setErrors({});
        }
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
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </label>
            <label style={{ marginBottom: '10px' }}>
                Team:
                <select name="team_id" value={formData.team_id} onChange={handleTeamChange} style={inputStyle}>
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                {errors.team_id && <p style={{ color: 'red' }}>{errors.team_id}</p>}
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
                {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
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
                {errors.profile_image_url && <p style={{ color: 'red' }}>{errors.profile_image_url}</p>}
            </label>
            <button type="submit" style={buttonStyle}>{wrestlerData ? 'Update Wrestler' : 'Add Wrestler'}</button>
        </form>
    );
}

export default WrestlerForm;
