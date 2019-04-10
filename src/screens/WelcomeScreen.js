import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

class WelcomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    WelcomeScreen
                </Text>
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
    }
});

export default WelcomeScreen;