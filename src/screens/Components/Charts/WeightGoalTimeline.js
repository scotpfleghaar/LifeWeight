import React, { Component } from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { Text, StyleSheet, View } from 'react-native'
import { HANSIS_DARK, HANSIS_MEDIUM_LIGHT, MONTHS, WEIGHT_POSTFIX } from '../../../../Constants'
import { connect } from 'react-redux'
import { sortRecords, weightLoseRate } from '../../Utilities'
import { mean } from 'lodash'
import {Divider, Icon} from 'react-native-elements'
import { FormButton } from '../FormButton';

class WeightGoalTimeline extends Component {

    render() {
        if(this.props.records.length < 3) return <Text>We Need at least three entries</Text>

        const goalWeight = 165;
        const averageRate = mean(weightLoseRate(this.props.records));
        const data = this.props.records.map(item => item.weight && Number(item.weight));
        const tenDayAverageWeight = mean(data).toFixed(1);
        const daysUntilComplete = ((tenDayAverageWeight - goalWeight) / averageRate).toFixed(0)
        let now, successMessage;
        if (daysUntilComplete > 0) {
            now = new Date();
            now.setDate(now.getDate() + Number(daysUntilComplete));
        } else {
            successMessage = 'Not Available'
        }
        const averageRateOfLoss = Number((averageRate * 7).toFixed(1));
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
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(WeightGoalTimeline);