import React, {Component} from 'react';
import {Icon, Text, Tooltip} from "react-native-elements";
import {View} from "react-native";
import {HANSIS_LIGHT, HANSIS_MEDIUM_LIGHT, PURE_WHITE, HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, TOOLTIP_WEIGHT_RECORD_DESCRIPTION} from "../../../Constants";


class CustomToolTip extends Component {

    render() {
        return (
            <Tooltip backgroundColor={HANSIS_MEDIUM} width={200} height={200} popover={<Text style={{color: PURE_WHITE}}>{TOOLTIP_WEIGHT_RECORD_DESCRIPTION}</Text>}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    { this.props.children }
                    <Icon
                        size={22}
                        name='info'
                        type='font-awesome'
                        color={ HANSIS_MEDIUM }
                    />
                </View>
            </Tooltip>
        )
    }
}


export default CustomToolTip