import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
import {Icon, Card} from 'react-native-elements';

import ReportsScreen from "./src/screens/ReportsScreen";
import RecordedWeightsScreen from "./src/screens/RecordedWeightsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import StartupAuthentication from "./src/screens/Authentication/StartupAuthentication";
import LogIn from "./src/screens/Authentication/LogIn";
import SignUp from "./src/screens/Authentication/SignUp";
import {HANSIS_DARK, HANSIS_MEDIUM, HANSIS_LIGHT} from './Constants'
import {HeaderWrapper} from "./src/screens/Components";

class Main extends React.Component {
    render() {
        return (
            <HeaderWrapper
                title={'Summary'}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollStyle}>

                    <Card
                        title='Your Weight'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            BLAH BLAH
                        </Text>
                    </Card>

                </ScrollView>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        paddingBottom: 110
    }
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
