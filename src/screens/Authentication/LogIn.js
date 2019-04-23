import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Input, Text, Button} from 'react-native-elements'
import {HANSIS_MEDIUM_DARK, HANSIS_MEDIUM} from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderWrapper, FormButton} from '../Components'
import {loginUser, emailChange, passwordChange, weightRecordsFetch} from "../../Redux/Actions";
import {connect} from "react-redux";
import firebase from 'firebase'

const DEVICE_WIDTH = Dimensions.get('window').width;


class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            passwordResponse: ''
        }
    }


    routeToSignUp() {
        this.setState({
                passwordResponse: ''
            })
        this.props.navigation.navigate('SignUp')
    };

    sendPasswordReset() {
         this.setState({
                passwordResponse: ''
            })
        const self = this;
        if (this.props.email) {
             firebase.auth().sendPasswordResetEmail(this.props.email).then(function() {
                self.setState({
                 passwordResponse: 'Password Reset Email Sent'
                })
            }).catch(function(error) {
                self.setState({
                    passwordResponse: error.errorMessage
                })
            });
        } else {
            self.setState({
                passwordResponse: 'Please Enter Email'
            })
        }
    }

    render() {
        return (
            <HeaderWrapper
                title={'Login'}
            >
                <View style={styles.formStyle}>
                    <Input
                        placeholder='Email'
                        value={this.props.email}
                        onChangeText={text => this.props.emailChange(text)}
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
                        secureTextEntry
                        value={this.props.password}
                        onChangeText={text => this.props.passwordChange(text)}
                        leftIconContainerStyle={styles.iconContainerStyle}
                        inputContainerStyle={{height: 52}}
                        errorMessage={this.props.error ? this.props.error : null}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color={HANSIS_MEDIUM_DARK}
                            />
                        }
                    />
                    <View style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Button 
                            title='Forgot Password?' 
                            onPress={this.sendPasswordReset.bind(this)}
                            type='clear'
                            titleStyle={{color: HANSIS_MEDIUM_DARK}}
                        />
                        {this.state.passwordResponse ? <Text>{this.state.passwordResponse}</Text> : null}
                    </View>
                    <FormButton
                        title={"Login"}
                        onPress={() => this.props.loginUser(this.props.email, this.props.password, () => {
                            this.props.weightRecordsFetch(() => {
                                this.props.navigation.navigate('App');
                            })
                        })}
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

     formButtonStyle: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    formStyle: {
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = state => {
    const {email, password, error, loading} = state.auth;
    return {
        email,
        password,
        error,
        loading
    }
};

export default connect(mapStateToProps, {loginUser, emailChange, passwordChange, weightRecordsFetch})(LogIn);