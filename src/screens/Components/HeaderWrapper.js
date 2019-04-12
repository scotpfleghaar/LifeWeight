import React, {Component} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, HANSIS_LIGHT, HANSIS_DARK } from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_WIDTH = Dimensions.get('window').width;

export class HeaderWrapper extends Component {
    render() {
        return (
            <View style={styles.viewStyle}>
               <Text style={styles.headerStyle} h2>{this.props.title}</Text>
               {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 64,
        textAlign: 'center',
        borderBottomColor: HANSIS_MEDIUM,
        borderBottomWidth: 1,
        width: DEVICE_WIDTH,
    },
    viewStyle: {
        marginTop: 32,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
});
