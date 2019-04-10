import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator} from "react-navigation";
import ReportsScreen from "./src/screens/ReportsScreen";
import RecordedWeightsScreen from "./src/screens/RecordedWeightsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import StartupAuthentication from "./src/screens/Authentication/StartupAuthentication";
import LogIn from "./src/screens/Authentication/LogIn";
import SignUp from "./src/screens/Authentication/SignUp";

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = createBottomTabNavigator({
        Home: {
            screen: App
        },
        Reports: {
            screen: ReportsScreen
        },
        Records: {
            screen: RecordedWeightsScreen
        },
        Settings: SettingsScreen,
    },
    {
        initialRouteName: "Home"
    }
);

const AuthStack = createStackNavigator({
        SignIn: LogIn,
        SignUp: SignUp
    });

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: StartupAuthentication,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default createAppContainer(AppNavigator);
