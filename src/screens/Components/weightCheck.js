import React, {Component} from 'react';
import {ButtonGroup, Icon, Text, Tooltip} from "react-native-elements";
import {StyleSheet, View, Dimensions} from "react-native";
import {HANSIS_LIGHT, HANSIS_MEDIUM_LIGHT, PURE_WHITE, HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, TOOLTIP_WEIGHT_RECORD_DESCRIPTION} from "../../../Constants";


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
class WeightCheck extends Component {
    constructor(props) {
        super(props);
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.props.selectedIndexUpdate(selectedIndex)
    }

    render() {
        const happyIcon = () => <Icon
            type={'font-awesome'}
            name={'check'}
            color={'green'}
        />;
        const sortaIcon = () => <Icon
            type={'font-awesome'}
            name={'minus'}
            color={HANSIS_MEDIUM_DARK}/>;
        const sadIcon = () => <Icon
            type={'font-awesome'}
            color={'salmon'}
            name={'times'}/>;

        const buttons = [{element: happyIcon}, {element: sortaIcon}, {element: sadIcon}];
        const {selectedIndex} = this.props;

        return (
            <View style={styles.viewGroup}>
                <Tooltip backgroundColor={HANSIS_MEDIUM_DARK} width={DEVICE_WIDTH * 0.8} height={180} popover={<Text style={{color: PURE_WHITE}}>{TOOLTIP_WEIGHT_RECORD_DESCRIPTION}</Text>}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                        <Text style={{marginRight: 10, fontSize: 18}}>How well did you follow your diet?</Text>
                        <Icon
                            size={22}
                            name='info'
                            type='font-awesome'
                            color={ HANSIS_MEDIUM }
                        />
                    </View>
                </Tooltip>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    selectedButtonStyle={styles.buttonGroupSelectedButtonStyle}
                    buttonStyle={styles.buttonGroupButtonStyle}
                    innerBorderStyle={{ color: HANSIS_MEDIUM_LIGHT }}
                    containerStyle={{borderColor: PURE_WHITE}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewGroup: {
        marginTop: 30
    },
    viewGroupLabel: {
        marginRight: 5,
        fontSize: 18
    },
    buttonGroupButtonStyle: {
        backgroundColor: PURE_WHITE,
    },
    buttonGroupSelectedButtonStyle: {
        backgroundColor: HANSIS_MEDIUM_LIGHT,
    }
});

export default WeightCheck;