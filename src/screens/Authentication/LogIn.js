import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Input, Text } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, HANSIS_LIGHT, HANSIS_DARK } from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderWrapper, FormButton } from '../Components'

const DEVICE_WIDTH = Dimensions.get('window').width;

class LogIn extends Component {
    routeToSignUp() {
        console.log('Button Pressed');
        this.props.navigation.navigate('SignUp')
    };

    render() {
        return (
            <HeaderWrapper
                title={'Login'}
            >
                 <View style={styles.formStyle}>
                    <Input
                        placeholder='Email'
                        leftIconContainerStyle={styles.iconContainerStyle}
                        inputContainerStyle={{height: 52}}
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
                        inputContainerStyle={{height: 52}}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color={HANSIS_MEDIUM_DARK}
                            />
                        }
                    />
                    <FormButton
                        title={"Login"}
                        // onPress={this.routeToSignUp.bind(this)}
                    />
               </View>
                <View style={styles.formStyle}>
                    <Text>Don't Have an Account?</Text>
                     <FormButton
                        title={"Create Account"}
                        onPress={this.routeToSignUp.bind(this)}
                    />
                </View>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
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
    }
});


export default LogIn;