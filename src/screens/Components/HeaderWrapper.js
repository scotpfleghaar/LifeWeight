import React, {Component} from 'react';
import { TouchableWithoutFeedback, View, Dimensions, Keyboard } from 'react-native';
import { Button, Input, Header } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, HANSIS_LIGHT, HANSIS_DARK } from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_WIDTH = Dimensions.get('window').width;

export class HeaderWrapper extends Component {
    render() {
        return (
            <View style={this.props.style}>
                <Header backgroundColor={HANSIS_MEDIUM_DARK} centerComponent={{ text: this.props.title, style: { color: HANSIS_LIGHT, fontSize: 24 } }} />
                {this.props.children}
            </View>
        );
    }
}
