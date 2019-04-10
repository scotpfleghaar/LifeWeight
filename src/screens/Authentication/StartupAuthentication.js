import React, {Component} from 'react';
import { View, Text} from 'react-native';
import { Button } from "react-native-elements";

class StartupAuthentication extends Component {
    routeToHome() {
        console.log('Button Pressed');
        this.props.navigation.navigate('Home')
    };

    render() {
        return (
            <View>
                <Text>
                    StartupAuthentication
                </Text>
                <Button
                    title={"Start"}
                    onPress={this.routeToHome.bind(this)}
                />
            </View>
        );
    }
}

export default StartupAuthentication;
