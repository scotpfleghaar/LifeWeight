import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { Input, Text } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK, HANSIS_MEDIUM } from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderWrapper, FormButton } from '../Components'
const DEVICE_WIDTH = Dimensions.get('window').width;

class SignUp extends Component {

    componentDidMount() {
        const self = this;
        BackHandler.addEventListener('hardwareBackPress', function() {
          self.props.navigation.navigate('SignIn')
        });
    }

    render() {
        return (
            <HeaderWrapper
                title={'Sign Up'}
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
                      <Input
                        placeholder='Confirm Password'
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
                        title={"Create Account"}
                        // onPress={this.routeToSignUp.bind(this)}
                    />
               </View>
                <View style={styles.formStyle}>
                    <Text>Already Have an Account?</Text>
                     <FormButton
                        title={"Login"}
                        onPress={() => this.props.navigation.navigate('SignIn')}
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



export default SignUp;