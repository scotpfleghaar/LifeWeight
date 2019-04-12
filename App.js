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
             apiKey: "AIzaSyBHizhi9yWthb-uvNr_juILneAtp8bZmiQ",
            authDomain: "tiberius-cougar-alpha.firebaseapp.com",
            databaseURL: "https://tiberius-cougar-alpha.firebaseio.com",
            projectId: "tiberius-cougar-alpha",
            storageBucket: "tiberius-cougar-alpha.appspot.com",
            messagingSenderId: "889412483336"
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
