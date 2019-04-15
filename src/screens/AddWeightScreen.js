import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Input} from 'react-native-elements'
import {HANSIS_MEDIUM_DARK, HANSIS_MEDIUM} from "../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderWrapper, FormButton} from './Components'
import {connect} from "react-redux";

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
                        inputContainerStyle={{height: 52}}
                    />
                    <FormButton
                        title={"Add Entry"}
                        onPress={() => this.goBack.bind(this)}
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

export default connect(mapStateToProps, {})(AddWeightScreen);