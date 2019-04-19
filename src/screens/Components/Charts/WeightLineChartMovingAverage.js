import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
import { Circle, Path, G, Line, Rect, Text } from 'react-native-svg'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import { HANSIS_DARK, HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT } from '../../../../Constants'
import { userGageToColor, averageTenDayArrayAlgorythem } from '../../Utilities'
import { connect } from 'react-redux'
import { sortRecords } from '../../Utilities'

class WeightLineChartMovingAverage extends Component {
    render() {
       if(this.props.records.length < 3) return <Text>We Need at least three entries</Text>
        const adjustedRecords = this.props.records.slice(0, 16);
        const data = adjustedRecords.map(item => item.weight && item.weight);
        const averagedData = averageTenDayArrayAlgorythem(data)

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10,  left: -10, right: 5 }
        const xAxisHeight = 0

         const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ HANSIS_DARK }
                    fill={ userGageToColor(adjustedRecords[index].userWeightGage) }
                />
            ))
        }

        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={averagedData}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={averagedData}
                        contentInset={verticalContentInset}
                        curve={shape.curveNatural}
                        svg={{ stroke: HANSIS_DARK }}
                    >

                        <Grid/>
                          <Decorator/>
                    </LineChart>
                </View>
            </View>
        )
    }

}

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(WeightLineChartMovingAverage);