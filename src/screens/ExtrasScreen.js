import React, {Component} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';

class ExtrasScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    ExtrasScreen
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


export default ExtrasScreen;