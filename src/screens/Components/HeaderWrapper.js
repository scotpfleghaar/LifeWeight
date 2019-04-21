import React, {Component} from 'react';
import { TouchableWithoutFeedback, View, Dimensions, Keyboard, Text } from 'react-native';
import { Button, Input, Header } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, HANSIS_LIGHT, HANSIS_DARK } from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const DEVICE_WIDTH = Dimensions.get('window').width;

export class HeaderWrapper extends Component {
    render() {
        const buttonBack = this.props.goBackCallBack ? <Button
            icon={
                <Icon
                    name="arrow-left"
                    size={15}
                    color="white"
                />
            }
            type={'clear'}
            titleStyle={{color: '#fff', marginLeft: 5}}
            title="Back"
            onPress={() => this.props.goBackCallBack()}
        /> : null;
        return (
            <View style={this.props.style}>
                <Header backgroundColor={HANSIS_MEDIUM_DARK} leftComponent={buttonBack} centerComponent={{ text: this.props.title, style: { color: HANSIS_LIGHT, fontSize: 24 } }} />
                {this.props.children}
            </View>
        );
    }
}
