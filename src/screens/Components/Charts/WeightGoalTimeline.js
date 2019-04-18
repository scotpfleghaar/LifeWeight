import React, { Component } from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { Text, StyleSheet, View } from 'react-native'
import { HANSIS_DARK, HANSIS_MEDIUM_DARK } from '../../../../Constants'
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

        console.log('NUMBERS:', averageRate, goalWeight, tenDayAverageWeight)

        const daysUntilComplete = ((tenDayAverageWeight - goalWeight) /averageRate).toFixed(0)
        console.log('daysUntilComplete', daysUntilComplete, typeof daysUntilComplete)
        let now = new Date(); 
        now.setDate(now.getDate() + Number(daysUntilComplete));
        console.log(now)
        console.log(`${now.getMonth() + 1}, ${now.getDate()}, ${now.getFullYear()}`)
        return (
            <View>
                <ProgressCircle
                    style={ { height: 200 } }
                    progress={ 0.7 }
                    progressColor={ HANSIS_MEDIUM_DARK }
                    startAngle={ -Math.PI * 0.8 }
                    endAngle={ Math.PI * 0.8 }
                />

                <Text style={styles.textStyle}>Current Rate: { averageRate }</Text>
                <Text style={styles.textStyle}>Current Weight: { tenDayAverageWeight }</Text>
                <Text style={styles.textStyle}>Goal Complition: { `${now.getMonth() + 1} ${now.getDate()}, ${now.getFullYear()}` }</Text>
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