import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute} from "react-router-dom";
import MainPage from './MainPage';
import LoginPage from './LoginPage'

function router() {
    return(    
        <Router>
        <Route path="/" component={LoginPage} />
        <Route path="/app" component={MainPage} />
        </Router>
    )
};

export default router;

