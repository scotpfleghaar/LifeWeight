import React, {Component} from 'react';
import {Button, Overlay, Text} from 'react-native-elements'
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT, PURE_WHITE} from "../../../Constants";
import WeightInput from "./WeightForm/WeightInput";
import WeightDatePicker from "./WeightForm/WeightDatePicker";
import WeightCheck from "./weightCheck";
import {FormButton} from "./FormButton";
import {todaysDate, parseDate } from "../Utilities";

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

    editWeightRecord() {
        this.props.editWeightRecord(parseFloat(this.state.weight), parseDate(todaysDate()), this.state.selectedIndex, () => {
            this.setState({
                weight: '',
                date: todaysDate(),
                selectedIndex: 0,
                isVisible: false
            });
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps.item', nextProps.item);
        console.log(nextProps.item.entryId);
        if (nextProps.item.entryId){
            this.setState({
                isVisible: true,
                weight: String(nextProps.item.weight),
                date: todaysDate(),
                selectedIndex: Number(nextProps.item.userWeightGage)
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
                        onPress={() => this.editWeightRecord()}
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

export default EditWeightOverlay;