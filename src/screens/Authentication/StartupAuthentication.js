import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';

class StartupAuthentication extends React.Component {
    constructor(props) {
        super(props);
        //this._bootstrapAsync();
    }

    componentDidMount() {
        this.props.navigation.navigate('Auth');
    }

    // Fetch the token from storage then navigate to our appropriate place
    // _bootstrapAsync = async () => {
    //     const userToken = await AsyncStorage.getItem('userToken');
    //
    //     // This will switch to the App screen or Auth screen and this loading
    //     // screen will be unmounted and thrown away.
    //     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    // };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}

export default StartupAuthentication;