import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

class UserSettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    UserSettingsScreen
                </Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back"
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
    }
});


export default UserSettingsScreen;