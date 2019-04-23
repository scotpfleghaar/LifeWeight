import React, {Component} from 'react';
import {Button, Overlay, Text, Divider} from 'react-native-elements'
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View, Keyboard} from 'react-native'
import {HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT, PURE_WHITE, HANSIS_DARK} from "../../../Constants";
import WeightInput from "./WeightForm/WeightInput";
import WeightDatePicker from "./WeightForm/WeightDatePicker";
import WeightCheck from "./weightCheck";
import {FormButton} from "./FormButton";
import {todaysDate, parseDate, sortRecords} from "../Utilities";
import {_storeData, editWeightRecord, recordDelete} from '../../Redux/Actions'
import {connect} from 'react-redux'
import moment from 'moment';
import { get } from 'lodash'

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
class EditWeightOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            weight: '',
            date: todaysDate(),
            weekOfEnteredDate: moment(new Date()).week(),
            selectedIndex: 0,
            areYouSure: false
        }
    }

    editWeightRecordFromState = () => {
        const newDate = parseDate(this.state.date);
        this.props.editWeightRecord(parseFloat(this.state.weight), newDate, this.state.selectedIndex, this.state.entryId, moment(new Date(newDate.year, newDate.month, newDate.day)).week(), this.doneEditingCallBack.bind(this));
    };

    deleteRecord = () =>  {
        this.props.recordDelete(this.state.entryId, this.doneEditingCallBack.bind(this));
    };

    doneEditingCallBack = () => {
        Keyboard.dismiss();
        this.props && this.props.doneEditing && this.props.doneEditing();
        this.setState({
            weight: '',
            date: todaysDate(),
            weekOfEnteredDate: moment(new Date()).week(),
            selectedIndex: 0,
            isVisible: false,
            areYouSure: false
        });
    };

    componentWillReceiveProps(nextProps) {
        if (get(nextProps, 'item.entryId', undefined)) {
            this.setState({
                isVisible: true,
                weight: String(nextProps.item.weight),
                date: `${nextProps.item.date.month}-${nextProps.item.date.day}-${nextProps.item.date.year}`,
                selectedIndex: Number(nextProps.item.userWeightGage),
                entryId: nextProps.item.entryId
            })
        } else {
            Keyboard.dismiss();
            this.setState({
                isVisible: false,
                areYouSure: false
            })
        }
    }

    areYouSure = () =>  {
        this.setState({
            areYouSure: !this.state.areYouSure
        })
    };

    render() {
        return (
            <Overlay
                isVisible={this.state.isVisible}
                windowBackgroundColor="rgba(0, 0, 0, .75)"
                overlayBackgroundColor={PURE_WHITE}
                width="auto"
                height={DEVICE_HEIGHT * 0.75}
            >
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
                        }}/>
                    <WeightCheck selectedIndex={this.state.selectedIndex}
                                 selectedIndexUpdate={(index) => this.setState({selectedIndex: index})}/>
                    <FormButton
                        title={"Update Entry"}
                        isDisabled={!this.state.weight}
                        onPress={() => this.editWeightRecordFromState()}
                    />

                    <FormButton
                        onPress={() => this.props.doneEditing()}
                        title={'Cancel'}
                    />
                    <View style={{borderTopColor: HANSIS_MEDIUM_LIGHT, borderTopWidth: 1, marginTop: 12, width: DEVICE_WIDTH/2}}/>
                    {this.state.areYouSure ?
                        <View>
                            <Text style={{textAlign: 'center', fontSize: 18, marginTop: 10}}>
                                Are you sure?
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 150}}>
                                <Button
                                    onPress={() => this.deleteRecord()}
                                    title={'Yes'}
                                    type="clear"
                                    titleStyle={{color: HANSIS_DARK}}
                                />
                                <Button
                                    onPress={() => this.areYouSure()}
                                    title={'No'}
                                    type="clear"
                                    titleStyle={{color: HANSIS_DARK}}
                                />
                            </View>
                        </View>
                        :
                        <FormButton
                            onPress={() => this.areYouSure()}
                            title={'Delete'}
                        />
                    }
                </View>
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    formStyle: {
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = state => {
    const {records} = state.app;
    return {
        records: sortRecords(records)
    }
};


export default connect(mapStateToProps, {editWeightRecord, recordDelete})(EditWeightOverlay);