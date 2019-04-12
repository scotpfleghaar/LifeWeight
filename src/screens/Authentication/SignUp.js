import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { HANSIS_DARK, HANSIS_LIGHT, HANSIS_MEDIUM_DARK } from "../../../Constants";

class SignUp extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <Button
                    title="Login"
                    type="clear"
                    titleStyle={styles.titleStyle}
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
                    titleStyle={ styles.buttonTitleStyle }
                    buttonStyle={ styles.buttonStyle }
                    onPress={this.routeToApp.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        color: HANSIS_MEDIUM_DARK
    },
    buttonTitleStyle: {
        color: HANSIS_LIGHT
    },
    buttonStyle: {
        backgroundColor: HANSIS_DARK
    }

});




export default SignUp;