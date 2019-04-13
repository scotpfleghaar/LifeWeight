import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, BackHandler} from 'react-native';
import {Input, Text} from 'react-native-elements'
import {HANSIS_MEDIUM_DARK, HANSIS_MEDIUM} from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderWrapper, FormButton} from '../Components'
import {connect} from "react-redux";
import {emailChange, createAccount, passwordChange} from "../../Redux/Actions";

const DEVICE_WIDTH = Dimensions.get('window').width;

class SignUp extends Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            matcherPassword: ''
        };
    }

    componentDidMount() {
        const self = this;
        BackHandler.addEventListener('hardwareBackPress', function () {
            self.props.navigation.navigate('SignIn')
        });
    }

    matcherPasswordChange(text) {
        this.setState({
            matcherPassword: text
        })
    }

    render() {
        return (
            <HeaderWrapper
                title={'Sign Up'}
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
                        value={this.props.password}
                        secureTextEntry
                        onChangeText={text => this.props.passwordChange(text)}
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
                        secureTextEntry
                        value={this.state.matcherPassword}
                        onChangeText={text => this.matcherPasswordChange(text)}
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
                    <FormButton
                        title={"Create Account"}
                        onPress={() => this.props.createAccount(this.props.email, this.props.password, this.state.matcherPassword, () => {
                            this.props.navigation.navigate('App')
                        })}
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


const mapStateToProps = state => {
    const {email, password, error, loading} = state.auth;
    return {
        email,
        password,
        error,
        loading
    }
};

export default connect(mapStateToProps, {createAccount, emailChange, passwordChange})(SignUp);