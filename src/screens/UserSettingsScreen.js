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
                        Cancel subscription any time. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period by going to your iOS Account Settings after purchase. Payment will be charged to iTunes Account. Any unused portion of free trial period, if offered, will be forfeited when you purchase a subscription.
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