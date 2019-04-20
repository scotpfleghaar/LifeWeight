import React, {Component} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {HeaderWrapper} from "./Components";

class ExtrasScreen extends Component {
    render() {
        return (
            <HeaderWrapper
                title={'Extras'}
            >
                <View style={styles.container}>
                    <Text>
                        ExtrasScreen
                    </Text>
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        title="Go back"
                    />
                </View>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default ExtrasScreen;