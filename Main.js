import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator
} from "react-navigation";
import {Icon} from 'react-native-elements';

import ReportsScreen from "./src/screens/ReportsScreen";
import RecordedWeightsScreen from "./src/screens/RecordedWeightsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import StartupAuthentication from "./src/screens/Authentication/StartupAuthentication";
import LogIn from "./src/screens/Authentication/LogIn";
import SignUp from "./src/screens/Authentication/SignUp";

import {HANSIS_DARK, HANSIS_MEDIUM, PURE_WHITE, HANSIS_LIGHT} from './Constants'

class Main extends React.Component {
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
        backgroundColor: PURE_WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const AppStack = createBottomTabNavigator({
        Home: {
            screen: Main,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Icon
                        name='home'
                        type='font-awesome'
                        color={tintColor}
                    />;
                },
            }
        },
        Reports: {
            screen: ReportsScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Icon
                        name='area-chart'
                        type='font-awesome'
                        color={tintColor}
                    />;
                },
            }
        },
        Records: {
            screen: RecordedWeightsScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Icon
                        name='bars'
                        type='font-awesome'
                        color={tintColor}
                    />;
                },
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Icon
                        name='cog'
                        type='font-awesome'
                        color={tintColor}
                    />;
                },
            }
        },
    },
    {
        initialRouteName: "Home",
        tabBarOptions: {
            showLabel: false,
            activeTintColor: HANSIS_MEDIUM,
            inactiveTintColor: HANSIS_DARK,
        },
        backgroundColor: HANSIS_LIGHT
    }
);

const AuthStack = createSwitchNavigator({
        SignIn: {
            name: 'Login',
            screen: LogIn
        },
        SignUp: {
            name: 'Create Account',
            screen: SignUp
        }
    },
    {
        initialRouteName: 'SignIn',
        navigationOptions: {
            tabBarVisible: false
        },
    }
);

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
