import React, {Component} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, } from 'react-native-elements'
import {HANSIS_DARK, HANSIS_MEDIUM_LIGHT} from "../../../Constants";

const DEVICE_WIDTH = Dimensions.get('window').width;

export class FormButton extends Component {
    render() {
        return (
             <Button
                 disabled={this.props.isDisabled}
                title={this.props.title}
                type="clear"
                titleStyle={ this.props.titleStyle ? this.props.titleStyle : styles.buttonTitleStyle }
                buttonStyle={ styles.buttonStyle }
                onPress={this.props.onPress}
            />
        );
    }
}

const styles = StyleSheet.create({
    buttonTitleStyle: {
        fontSize: 24,
        color: HANSIS_DARK
    },

    buttonStyle: {
        marginTop: 22,
        backgroundColor: HANSIS_MEDIUM_LIGHT,
        width: DEVICE_WIDTH * 0.75,
    }
});