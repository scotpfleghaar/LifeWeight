import React, { Component } from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { Text, StyleSheet, View } from 'react-native'
import { HANSIS_DARK, HANSIS_MEDIUM_LIGHT, MONTHS, WEIGHT_POSTFIX, HANSIS_MEDIUM } from '../../../../Constants'
import { connect } from 'react-redux'
import { sortRecords, weightLoseRate, weightLossRatePerWeek } from '../../Utilities'
import { mean } from 'lodash'
import {Divider, Icon} from 'react-native-elements'
import { FormButton } from '../FormButton';

class WeightGoalTimeline extends Component {

    render() {
        if (this.props.records.length < 3) return <Text>We Need at least three entries</Text>;

        const goalWeight = this.props.goalWeight;
        if (!goalWeight) return <Text>Set Goal In settings!</Text>;
        const averageRate = weightLoseRate(weightLossRatePerWeek(this.props.records))[0]; // .toFixed(1)
        if (averageRate.length === 0) return <Text>Enter at least 8 days of information to see this data</Text>;
        const message = averageRate.length < 3 ? `Accuracy will increase over the first few weeks` : null;
        const data = this.props.records.map(item => item.weight && Number(item.weight));
        const tenDayAverageWeight = mean(data).toFixed(1);
        const daysUntilComplete = ((tenDayAverageWeight - goalWeight) / (averageRate / 7 )).toFixed(0);
        let now, successMessage;
        if (daysUntilComplete > 0) {
            now = new Date();
            now.setDate(now.getDate() + Number(daysUntilComplete));
        } else {
            successMessage = 'Not Available'
        }
        const averageRateOfLoss = Number((averageRate)).toFixed(1);
        const gainOrLoss = averageRateOfLoss >= 0 ? 'chevron-down' : 'chevron-up';


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
                {successMessage ? null :
                    <View>
                        <Divider style={{ backgroundColor: HANSIS_MEDIUM_LIGHT, height: 1,  margin: 10, marginLeft: 0 }} />
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