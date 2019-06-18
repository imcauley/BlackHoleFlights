import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute} from "react-router-dom";
import MainPage from './MainPage';
import LoginPage from './LoginPage'

function router() {
    return(    
        <Router>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/app" component={MainPage} />
        </Router>
    )
};

export default router;

