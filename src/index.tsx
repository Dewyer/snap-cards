import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { defaultState, mainReducer } from './reducers';
import { Router, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import thunk from "redux-thunk";


import RootView from './views/RootView';

const store = createStore(mainReducer, defaultState(), applyMiddleware(thunk)); // applyMiddleware(thunk)
export const browserHistory = createBrowserHistory();

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router history={browserHistory} >
				<RootView />
			</Router>
		</Provider>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
