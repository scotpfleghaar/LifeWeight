import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Input, Text} from 'react-native-elements'
import {HANSIS_MEDIUM_DARK, HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT} from "../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderWrapper, FormButton} from './Components'
import {connect} from "react-redux";
import WeightCheck from "./Components/weightCheck";
import DatePicker from 'react-native-datepicker'
import { addWeightRecord } from '../Redux/Actions'

const DEVICE_WIDTH = Dimensions.get('window').width;


class AddWeightScreen extends Component {
    state;
    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            date: this.todaysDate(),
            selectedIndex: 0
        }
    }

    todaysDate() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        return `${mm}-${dd}-${yyyy}`
    }


    parseDate(date){
        const parsedDate = date.split('-')
        return {
            month: parsedDate[0],
            day: parsedDate[1],
            year: parsedDate[2]
        }
    }

    addWeightRecordToState() {
        this.props.addWeightRecord(parseFloat(this.state.weight), this.parseDate(this.todaysDate()), this.state.selectedIndex, () => {
            this.setState({
                weight: '',
                date: this.todaysDate(),
                selectedIndex: 0
            })
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.formStyle}>
                        <Input
                            placeholder='Weight'
                            keyboardType='numeric'
                            value={this.state.weight}
                            onChangeText={(text) => {
                                this.setState({
                                    weight: text
                                })
                            }}
                            leftIconContainerStyle={styles.iconContainerStyle}
                            inputContainerStyle={{height: 64, width: DEVICE_WIDTH/2, alignSelf: 'center',  marginTop: 30}}
                            inputStyle={{textAlign: 'center', fontSize: 40}}
                        />
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="MM-DD-YYYY"
                            maxDate={this.todaysDate()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderColor: '#fff',
                                    fontSize: 20,
                                    color: HANSIS_MEDIUM_LIGHT
                                }
                            }}
                            style={{
                                height: 30,
                                borderColor: '#fff'
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                       <WeightCheck selectedIndex={this.state.selectedIndex} selectedIndexUpdate={(index) => this.setState({selectedIndex: index})}/>
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
    iconContainerStyle: {
        width: 52
    },

    headerStyle: {
        height: 64,
        textAlign: 'center',
        borderBottomColor: HANSIS_MEDIUM,
        borderBottomWidth: 1,
        width: DEVICE_WIDTH,
    },

    formStyle: {
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = state => {
    const {email, password, error, loading} = state.auth;
    return { 
        email,
        password,
        error,
        loading
    }
};

export default connect(mapStateToProps, {addWeightRecord})(AddWeightScreen);