import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { HANSIS_MEDIUM_LIGHT} from "../../../Constants";

class SignUp extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <Button
                    title="Login"
                    type="clear"
                    buttonStyles={styles.buttonStyle}
                    onPress={() => navigation.goBack()}
                />
            ),
        }
    };

    routeToApp() {
        console.log('Button Pressed');
        this.props.navigation.navigate('App')
    };

    render() {
        return (
            <View>
                <Text>
                    SignUp
                </Text>
                <Button
                    title={"Start"}
                    buttonStyle={ styles.buttonStyle }
                    onPress={this.routeToApp.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        color: HANSIS_MEDIUM_LIGHT
    }
});




export default SignUp;