import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Text} from 'react-native';
import {HANSIS_MEDIUM, HANSIS_MEDIUM_DARK, WEIGHT_POSTFIX} from "../../Constants";
import {HeaderWrapper, FormButton} from './Components'
import {connect} from "react-redux";
import { updateGoalWeight } from '../Redux/Actions'
import WeightInput from "./Components/WeightForm/WeightInput";
import {todaysDate, sortRecords} from "./Utilities";

const DEVICE_WIDTH = Dimensions.get('window').width;


class GoalWeightScreen extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            goalWeight: '',
        }
    }

    updateWeightGoalAndStore() {
        this.props.updateGoalWeight(this.state.goalWeight, () => {
            this.setState({
                goalWeight: ''
            });
            Keyboard.dismiss();
        })
    }

    render() {
        return (
            <HeaderWrapper
                title={'Update Goal'}
                goBackCallBack={this.props.navigation.goBack}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.formStyle}>
                        {this.props.goalWeight ? <Text style={{ fontSize: 32 }}>Current Goal: <Text style={{ color: HANSIS_MEDIUM_DARK }}>{`${this.props.goalWeight} ${WEIGHT_POSTFIX}`}</Text></Text> : null }
                        <WeightInput
                            onWeightEntered={(text) => {
                                this.setState({
                                    goalWeight: text
                                })
                            }}
                            weight={this.state.goalWeight}
                        />
                        <FormButton
                            title={"Update Goal"}
                            isDisabled={!this.state.goalWeight}
                            onPress={() => this.updateWeightGoalAndStore()}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </HeaderWrapper>
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

    formStyle: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = state => {
    const { goalWeight } = state.app;
    return {
        goalWeight
    }
};

export default connect(mapStateToProps, {updateGoalWeight})(GoalWeightScreen);