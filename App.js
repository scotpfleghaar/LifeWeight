import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator} from "react-navigation";
import { ThemeProvider, Icon } from 'react-native-elements';


import ReportsScreen from "./src/screens/ReportsScreen";
import RecordedWeightsScreen from "./src/screens/RecordedWeightsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import StartupAuthentication from "./src/screens/Authentication/StartupAuthentication";
import LogIn from "./src/screens/Authentication/LogIn";
import SignUp from "./src/screens/Authentication/SignUp";

class App extends React.Component {
    render() {
        return (
            <ThemeProvider>
                <Text>Open up App.js to start working on your app!</Text>
            </ThemeProvider>
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
            screen: App,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                 return <Icon
                    name='home'
                    type='font-awesome'
                     />;
                },
            }
        },
        Reports: {
            screen: ReportsScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                 return <Icon
                    name='area-chart'
                    type='font-awesome'
                     />;
                },
            }
        },
        Records: {
            screen: RecordedWeightsScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                 return <Icon
                    name='bars'
                    type='font-awesome'
                     />;
                },
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                 return <Icon
                    name='cog'
                    type='font-awesome'
                     />;
                },
            }
        },
    },
    {
        initialRouteName: "Home",
        tabBarOptions: { showLabel: false }

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
