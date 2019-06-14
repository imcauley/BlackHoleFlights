import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './routes';

// ReactDOM.render(<MainPage />, document.getElementById('root'));

ReactDOM.render(
    <App/>,
    document.getElementById('root')
    // <Router routes={routes} history={history} />,
    // document.getElementById('your-app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
