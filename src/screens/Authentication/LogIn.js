import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, HANSIS_LIGHT, HANSIS_DARK } from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_WIDTH = Dimensions.get('window').width;

class LogIn extends Component {
    static navigationOptions = ({navigation}) => {
       return {
           headerRight: (
               <Button
                   title="Sign Up"
                   type="clear"
                   titleStyle={styles.titleStyle}
                   onPress={() => navigation.navigate('SignUp')}
               />
           ),
       }
    };

    render() {
        return (
            <View style={styles.viewStyle}>
               <Text style={styles.headerStyle} h2>Login</Text>
               <View style={styles.formStyle}>
                 <Input
                    placeholder='Email'
                    leftIconContainerStyle={styles.iconContainerStyle}
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color={HANSIS_MEDIUM_DARK}
                        />
                    }
                    />
                    <Input
                        placeholder='Password'
                        leftIconContainerStyle={styles.iconContainerStyle}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color={HANSIS_MEDIUM_DARK}
                            />
                        }
                    />
                    <Button
                        title={"Login"}
                        type="clear"
                        titleStyle={ styles.buttonTitleStyle }
                        buttonStyle={ styles.buttonStyle }
                        //onPress={this.routeToApp.bind(this)}
                    />
               </View>
                <View style={styles.formStyle}>
                    <Text>Don't Have an Account?</Text>
                     <Button
                        title={"Create Account"}
                        type="clear"
                        titleStyle={ styles.buttonTitleStyle }
                        buttonStyle={ styles.buttonStyle }
                        //onPress={this.routeToApp.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        color: HANSIS_MEDIUM_DARK
    },

    iconContainerStyle: {
       width: 52
    },

    headerStyle: {
        height: 64,
        textAlign: 'center',
        borderBottomColor: HANSIS_MEDIUM,
        borderBottomWidth: 1,
        width: DEVICE_WIDTH,
    },

    formStyle: {
        height: 240,
        justifyContent: 'center',
         alignItems: 'center',
    },

    viewStyle: {
        marginTop: 32,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },

     buttonTitleStyle: {
        fontSize: 24,
        color: HANSIS_DARK
    },

    buttonStyle: {
        marginTop: 22,
        // backgroundColor: HANSIS_DARK,
        width: DEVICE_WIDTH * 0.75,
    }
});


export default LogIn;