import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Main from './Main'
import reducers from './src/Redux/Reducers';
class App extends React.Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyAofptNb9dVMTXF_L1meY6MmvguRUEWgM0",
            authDomain: "reactnativemanager-fda85.firebaseapp.com",
            databaseURL: "https://reactnativemanager-fda85.firebaseio.com",
            projectId: "reactnativemanager-fda85",
            storageBucket: "reactnativemanager-fda85.appspot.com",
            messagingSenderId: "716165608292"
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(
            reducers,
            {},
            applyMiddleware(ReduxThunk)
        );
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

export default App;
