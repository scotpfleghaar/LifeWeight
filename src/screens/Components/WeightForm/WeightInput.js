import React, {Component} from 'react';
import {Input} from "react-native-elements";
import {Dimensions, StyleSheet} from "react-native";
import {HANSIS_MEDIUM} from "../../../../Constants";
const DEVICE_WIDTH = Dimensions.get('window').width;

class WeightInput extends Component {
    render() {
        return (
            <Input
                placeholder='Weight'
                keyboardType='numeric'
                value={this.props.weight}
                onChangeText={(text) => this.props.onWeightEntered(text)}
                leftIconContainerStyle={styles.iconContainerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={{textAlign: 'center', fontSize: 40}}
            />
        );
    }
}

const styles = StyleSheet.create({
    iconContainerStyle: {
        width: 52
    },
    inputContainerStyle: {
        height: 64,
        width: DEVICE_WIDTH/2,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    }

});

export default WeightInput;