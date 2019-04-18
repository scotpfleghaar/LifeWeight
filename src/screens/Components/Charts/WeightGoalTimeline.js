import React, { Component } from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { Text, StyleSheet, View } from 'react-native'
import { HANSIS_DARK, HANSIS_MEDIUM_DARK, MONTHS } from '../../../../Constants'
import { connect } from 'react-redux'
import { sortRecords, weightLoseRate } from '../../Utilities'
import { mean } from 'lodash'

class WeightGoalTimeline extends Component {

    render() {
        if(this.props.records.length === 0) return null

        const goalWeight = 165;

        const averageRate = mean(weightLoseRate(this.props.records));
        const data = this.props.records.map(item => item.weight && Number(item.weight));
        const tenDayAverageWeight = mean(data).toFixed(1)
        const daysUntilComplete = ((tenDayAverageWeight - goalWeight) / averageRate).toFixed(0)
        let now = new Date(); 
        now.setDate(now.getDate() + Number(daysUntilComplete));

        return (
            <View>
                <Text>Weight loss rate per week:</Text>
                <Text style={styles.textStyle}>{ `${(averageRate * 7).toFixed(2)}` }</Text>
                <Text>At your current rate you'll reach your goal on:</Text>
                <Text style={styles.textStyle}>{ `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}` }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 24,
        color: HANSIS_DARK,
    }
});


const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(WeightGoalTimeline);