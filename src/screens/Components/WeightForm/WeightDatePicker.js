import React, {Component} from 'react';
import {HANSIS_MEDIUM_LIGHT} from "../../../../Constants";
import { todaysDate } from "../../Utilities";
import DatePicker from 'react-native-datepicker'

class WeightDatePicker extends Component {
    render() {
        return (
            <DatePicker
                style={{width: 200}}
                date={this.props.date}
                mode="date"
                placeholder="select date"
                format="MM-DD-YYYY"
                maxDate={todaysDate()}
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
                onDateChange={(date)=>this.props.onDateChange(date)}
            />
        );
    }
}

export default WeightDatePicker;