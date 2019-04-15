import React from 'react';
import firebase from 'firebase'
import {
    ActivityIndicator,
    View,
} from 'react-native';


class StartupAuthentication extends React.Component {

    constructor() {
        super();
        this.state = {
        loading: true,
        authenticated: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('App');
            } else {
               this.props.navigation.navigate('Auth');
            }
        });
    }

     render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}

export default StartupAuthentication;