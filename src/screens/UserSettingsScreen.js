import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {HeaderWrapper} from "./Components";

class UserSettingsScreen extends Component {
    render() {
        return (
            <HeaderWrapper
                title={'User Settings'}
                goBackCallBack={this.props.navigation.goBack}
            >
                <View style={styles.container}>
                    <Text>
                        UserSettingsScreen
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


export default UserSettingsScreen;