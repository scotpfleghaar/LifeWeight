import React, {Component} from 'react';
import {Button, Overlay, Text} from 'react-native-elements'
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT, PURE_WHITE} from "../../../Constants";
import WeightInput from "./WeightForm/WeightInput";
import WeightDatePicker from "./WeightForm/WeightDatePicker";
import WeightCheck from "./weightCheck";
import {FormButton} from "./FormButton";
import {todaysDate, parseDate } from "../Utilities";
import { editWeightRecord } from '../../Redux/Actions' 
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
            selectedIndex: 0
        }
    }

    editWeightRecordFromState() {
        this.props.editWeightRecord(parseFloat(this.state.weight), parseDate(this.state.date), this.state.selectedIndex, this.state.entryId, () => {
            this.setState({
                weight: '',
                date: todaysDate(),
                selectedIndex: 0,
                isVisible: false
            });
        })
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
            this.setState({
                isVisible: false
            })
        }
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
                    <Button
                        onPress={() => this.props.doneEditing()}
                        title={'Cancel'}
                    />
                </View>
            </Overlay>
        );
    }
}

const styles = StyleSheet.create({
    formStyle: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default connect(null, { editWeightRecord })(EditWeightOverlay);