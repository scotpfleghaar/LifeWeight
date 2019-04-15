import {createBottomTabNavigator, createSwitchNavigator} from "react-navigation";
import {Icon} from "react-native-elements";
import ReportsScreen from "../screens/ReportsScreen";
import RecordedWeightsScreen from "../screens/RecordedWeightsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from '../screens/HomeScreen'
import {HANSIS_DARK, HANSIS_LIGHT, HANSIS_MEDIUM} from "../../Constants";
import LogIn from "../screens/Authentication/LogIn";
import SignUp from "../screens/Authentication/SignUp";
import StartupAuthentication from "../screens/Authentication/StartupAuthentication";
import React from "react";
import AddWeightScreen from "../screens/AddWeightScreen";

const AppStack = createBottomTabNavigator({
        Home: {
            screen: HomeScreen,
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
        Add: {
            screen: AddWeightScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Icon
                        name='plus'
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
        backgroundColor: HANSIS_LIGHT,
        drawBehind:true
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

export default createSwitchNavigator(
    {
        AuthLoading: StartupAuthentication,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);


// const devRouter = createBottomTabNavigator({
//     Home: {
//         screen: AddWeightScreen,
//         navigationOptions: {
//             tabBarIcon: ({tintColor}) => {
//                 return <Icon
//                     name='home'
//                     type='font-awesome'
//                     color={tintColor}
//                 />;
//             },
//         }
//     }
// }, {
//     initialRouteName: "Home",
// });
//
// export default createSwitchNavigator(
//     {
//         dev: devRouter,
//     },
//     {
//         initialRouteName: 'dev',
//     }
// );