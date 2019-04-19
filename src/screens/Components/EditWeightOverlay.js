import React, {Component} from 'react';
import {Button, Overlay, Text, Divider} from 'react-native-elements'
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View, Keyboard} from 'react-native'
import {HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT, PURE_WHITE} from "../../../Constants";
import WeightInput from "./WeightForm/WeightInput";
import WeightDatePicker from "./WeightForm/WeightDatePicker";
import WeightCheck from "./weightCheck";
import {FormButton} from "./FormButton";
import {todaysDate, parseDate, sortRecords} from "../Utilities";
import {_storeData, editWeightRecord, recordDelete} from '../../Redux/Actions'
import { connect } from 'react-redux'

const DEVICE_HEIGHT = Dimensions.get('window').height;

class EditWeightOverlay extends Component {
    state;
    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            weight: '',
            date: todaysDate(),
            selectedIndex: 0,
            areYouSure: false
        }
    }

    editWeightRecordFromState() {
        this.props.editWeightRecord(parseFloat(this.state.weight), parseDate(this.state.date), this.state.selectedIndex, this.state.entryId, this.doneEditingCallBack.bind(this));
    }

    deleteRecord() {
        this.props.employeeDelete(this.state.entryId, this.doneEditingCallBack.bind(this));
    }

    doneEditingCallBack () {
         Keyboard.dismiss();
         this.props.doneEditing();
         this.setState({
                weight: '',
                date: todaysDate(),
                selectedIndex: 0,
                isVisible: false
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item.entryId){
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
                isVisible: false
            })
        }
    }

    areYouSure(){
        this.setState({
            areYouSure: !this.state.areYouSure
        })
    }

    render() {
        return (
            <Overlay
                isVisible={this.state.isVisible}
                windowBackgroundColor="rgba(0, 0, 0, .75)"
                overlayBackgroundColor={PURE_WHITE}
                width="auto"
                height={DEVICE_HEIGHT*0.75}
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
                        }}  />
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
                                />
                                <Button
                                    onPress={() => this.areYouSure()}
                                    title={'No'}
                                    type="clear"
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
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};


export default connect(mapStateToProps, { editWeightRecord, employeeDelete: recordDelete })(EditWeightOverlay);