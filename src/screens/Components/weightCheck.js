import React, {Component} from 'react';
import {ButtonGroup, Icon, Text, Tooltip, Button, Overlay} from "react-native-elements";
import {StyleSheet, View, Dimensions, TouchableWithoutFeedback} from "react-native";
import {HANSIS_LIGHT, HANSIS_DARK, HANSIS_MEDIUM_LIGHT, PURE_WHITE, HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, TOOLTIP_WEIGHT_RECORD_DESCRIPTION} from "../../../Constants";
import HowWellDidYouFollowYourDietDescription from './HowWellDidYouFollowYourDietDescription'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
class WeightCheck extends Component {
    constructor(props) {
        super(props);
        this.updateIndex = this.updateIndex.bind(this)
        this.state = {
            isVisible: false
        }
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
                 <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(0, 0, 0, .75)"
                    overlayBackgroundColor={PURE_WHITE}
                    width={DEVICE_WIDTH * 0.75}
                    height="auto"
                    onBackdropPress={() => this.setState({isVisible: !this.state.isVisible})}
                >
                    <View>
                        <HowWellDidYouFollowYourDietDescription/>
                    </View>
                </Overlay>
                <Button
                    icon={
                        <Icon
                        size={22}
                        name='info'
                        type='font-awesome'
                        color={ HANSIS_MEDIUM }
                    />
                    }
                    type={'clear'}
                    iconRight
                    titleStyle={{marginRight: 10, fontSize: 18, color: HANSIS_DARK}}
                    title="Did you follow your diet?"
                    onPress={() => this.setState({isVisible: !this.state.isVisible})}
                    />

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
        marginTop: 30,
        backgroundColor: PURE_WHITE
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