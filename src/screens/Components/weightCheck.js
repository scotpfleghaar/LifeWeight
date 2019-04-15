import React, {Component} from 'react';
import {ButtonGroup, Icon, Text} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {HANSIS_LIGHT, HANSIS_MEDIUM_LIGHT, PURE_WHITE} from "../../../Constants";

class WeightCheck extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0
        };
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
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
            color={'blue'}/>;
        const sadIcon = () => <Icon
            type={'font-awesome'}
            color={'salmon'}
            name={'times'}/>;

        const buttons = [{element: happyIcon}, {element: sortaIcon}, {element: sadIcon}];
        const {selectedIndex} = this.state;

        return (
            <View style={styles.viewGroup}>
                <Text style={styles.viewGroupLabel}>How well did you follow your diet since the last record?</Text>
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
        marginBottom: 5
    },
    buttonGroupButtonStyle: {
        backgroundColor: PURE_WHITE,
    },
    buttonGroupSelectedButtonStyle: {
        backgroundColor: HANSIS_MEDIUM_LIGHT,
    }
});

export default WeightCheck;