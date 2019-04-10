import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Button } from "react-native-elements";
import { HANSIS_DARK } from '../../../Constants';

class StartupAuthentication extends Component {
    routeToHome() {
        console.log('Button Pressed');
        this.props.navigation.navigate('Home')
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    StartupAuthentication
                </Text>
                <Button
                    title={"Start"}
                    buttonStyle={ styles.buttonStyle }
                    onPress={this.routeToHome.bind(this)}
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
    buttonStyle: {
        backgroundColor: HANSIS_DARK
    }
});


export default StartupAuthentication;
