import React, { Component } from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { Text, StyleSheet, View } from 'react-native'
import { HANSIS_DARK, HANSIS_MEDIUM_LIGHT, MONTHS, WEIGHT_POSTFIX, HANSIS_MEDIUM, NO_WEIGHT_TIMELINE } from '../../../../Constants'
import { connect } from 'react-redux'
import { sortRecords, weightLoseRate, weightLossRatePerWeek } from '../../Utilities'
import { mean } from 'lodash'
import {Divider, Icon} from 'react-native-elements'
import { FormButton } from '../FormButton';

class WeightGoalTimeline extends Component {

    render() {
        const goalWeight = this.props.goalWeight;
        if (!goalWeight) return <Text>Set Goal In settings!</Text>;
        let averageRate = weightLossRatePerWeek(this.props.records);
        if (!averageRate || averageRate.length === 0) {
            averageRate = weightLoseRate(this.props.records);
        }
        const message = this.props.records.length < 10 ? `Accuracy will increase over the first few weeks` : null;
        const data = this.props.records.map(item => item.weight && Number(item.weight));
        const tenDayAverageWeight = mean(data).toFixed(1);
        const daysUntilComplete = ((tenDayAverageWeight - goalWeight) / (averageRate / 7 )).toFixed(0);
        let now, successMessage;
        console.log(isFinite(Number(daysUntilComplete)));
        if (Number(daysUntilComplete) > 0 && isFinite(Number(daysUntilComplete))) {
            now = new Date();
            now.setDate(now.getDate() + Number(daysUntilComplete));
        } else {
            successMessage = true
        }
        let averageRateOfLoss = Number((averageRate)).toFixed(1);
        const gainOrLoss = averageRateOfLoss >= 0 ? 'chevron-down' : 'chevron-up';
        if (isNaN(averageRateOfLoss)) averageRateOfLoss = 0;

        return (
            <View>
                <Text>Current weight(<Text style={{color: HANSIS_DARK,}}>{ `${WEIGHT_POSTFIX}` }</Text>) change per week:</Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',  alignItems: 'center'}}>
                    <Text style={styles.textStyle}>{ `${Math.abs(averageRateOfLoss)} ${WEIGHT_POSTFIX}` }</Text>
                    <Icon
                        iconStyle={{height: 18, marginLeft: 5}}
                        type='font-awesome'
                        name={gainOrLoss}
                        size={18}
                        color={HANSIS_DARK}
                    />
                </View>
                <Divider style={{ backgroundColor: HANSIS_MEDIUM_LIGHT, height: 1,  margin: 10, marginLeft: 0 }} />
                {successMessage ? <Text>{NO_WEIGHT_TIMELINE}</Text> :
                    <View>
                        <Text>At your current rate you'll reach <Text style={{color: HANSIS_DARK,}}>{ `${goalWeight} ${WEIGHT_POSTFIX}` }</Text> on:</Text>
                        <Text style={styles.textStyle}>{ `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}` }</Text>
                    </View>
                }
                <Text style={{marginTop: 5, color: HANSIS_MEDIUM}}>{message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 28,
        color: HANSIS_DARK,
        marginTop: 5
    }
});


const mapStateToProps = state => {
    const { records, goalWeight } = state.app;
    return {
        records: sortRecords(records),
        goalWeight: Number(goalWeight)
    }
};

export default connect(mapStateToProps)(WeightGoalTimeline);