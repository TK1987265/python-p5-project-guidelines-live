import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WrestlersList from './components/WrestlersList';
import TeamsList from './components/TeamsList';
import EventsList from './components/EventsList';
import MatchesList from './components/MatchesList';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/wrestlers" element={<WrestlersList />} />
                <Route path="/teams" element={<TeamsList />} />
                <Route path="/events" element={<EventsList />} />
                <Route path="/matches" element={<MatchesList />} />
            </Routes>
        </Router>
    );
};

export default App;
