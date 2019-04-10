import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer, createStackNavigator} from "react-navigation";
import { Button } from 'react-native-elements'
import ReportsScreen from "./src/screens/ReportsScreen";
import RecordedWeightsScreen from "./src/screens/RecordedWeightsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Button
                    title="Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
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

const HomeStack = createStackNavigator({
    Home: {
        screen: App
    },
    Settings: SettingsScreen,
});

const AppNavigator = createBottomTabNavigator({
        Home: HomeStack,
        Reports: {
            screen: ReportsScreen
        },
        Records: {
            screen: RecordedWeightsScreen
        }
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(AppNavigator);
