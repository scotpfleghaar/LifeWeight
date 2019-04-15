import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Input, Text} from 'react-native-elements'
import {HANSIS_MEDIUM_DARK, HANSIS_MEDIUM} from "../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderWrapper, FormButton} from './Components'
import {connect} from "react-redux";
import WeightCheck from "./Components/weightCheck";

const DEVICE_WIDTH = Dimensions.get('window').width;


class AddWeightScreen extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            weight: ''
        }
    }

    goBack() {
        console.log('Button Pressed');
        this.props.navigation.navigate.pop()
    };

    render() {
        return (
            <HeaderWrapper
                title={'Add Record'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.formStyle}>
                        <Input
                            placeholder='Weight'
                            keyboardType='numeric'
                            value={this.state.weight}
                            onChangeText={(text) => {
                                this.setState({
                                    weight: text
                                })
                            }}
                            leftIconContainerStyle={styles.iconContainerStyle}
                            inputContainerStyle={{height: 64, width: DEVICE_WIDTH/2, alignSelf: 'center',  marginTop: 30}}
                            inputStyle={{textAlign: 'center', fontSize: 40}}
                        />
                       <WeightCheck/>
                        <FormButton
                            title={"Add Entry"}
                            onPress={() => this.goBack.bind(this)}
                        />
                    </View>
                </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, {})(AddWeightScreen);