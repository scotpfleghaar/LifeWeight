import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";
import ReportsScreen from "./src/screens/ReportsScreen";
import RecordedWeightsScreen from "./src/screens/RecordedWeightsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

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

const AppNavigator = createBottomTabNavigator({
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

export default createAppContainer(AppNavigator);
