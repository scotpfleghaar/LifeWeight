import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { HANSIS_MEDIUM } from "../../Constants";
import {HeaderWrapper, FormButton} from './Components'
import {connect} from "react-redux";
import WeightCheck from "./Components/weightCheck";
import WeightDatePicker from "./Components/WeightForm/WeightDatePicker";
import {addWeightRecord, _storeData} from '../Redux/Actions'
import WeightInput from "./Components/WeightForm/WeightInput";
import {todaysDate, parseDate, sortRecords} from "./Utilities";
import moment from 'moment';

const DEVICE_WIDTH = Dimensions.get('window').width;


class AddWeightScreen extends Component {
    state;

    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            date: todaysDate(),
            selectedIndex: 0
        }
    }

    addWeightRecordToState() {
        const newDate = parseDate(this.state.date);
        const weekOfEnteredDate = moment(new Date(newDate.year, newDate.month, newDate.day)).week();
        this.props.addWeightRecord(parseFloat(this.state.weight), newDate, this.state.selectedIndex, weekOfEnteredDate, () => {
            this.setState({
                weight: '',
                date: todaysDate(),
                selectedIndex: 0
            });
            this.goHome();
        })
    }

    goHome() {
        this.props.navigation.navigate('Home')
    };

    render() {
        return (
            <HeaderWrapper
                title={'Add Record'}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{background: '#ffffff'}}>
                    <View style={styles.formStyle}>
                        <WeightInput
                            onWeightEntered={(text) => {
                                this.setState({
                                    weight: text
                                })
                            }}
                            weight={this.state.weight}
                        />
                        <WeightDatePicker
                            date={this.state.date}
                            onDateChange={(date) => {
                            this.setState({date: date})
                        }}  />
                        <WeightCheck selectedIndex={this.state.selectedIndex}
                                     selectedIndexUpdate={(index) => this.setState({selectedIndex: index})}/>
                        <FormButton
                            title={"Add Entry"}
                            isDisabled={!this.state.weight}
                            onPress={() => this.addWeightRecordToState()}
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
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps, {addWeightRecord})(AddWeightScreen);