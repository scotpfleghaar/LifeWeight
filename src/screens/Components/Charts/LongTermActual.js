import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { AreaChart, Grid, YAxis } from 'react-native-svg-charts'
import { Circle, Path, G, Line, Rect, Text } from 'react-native-svg'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import { HANSIS_DARK, HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT } from '../../../../Constants'
import { userGageToColor, averageTenDayArrayAlgorythem } from '../../Utilities'
import { connect } from 'react-redux'
import { sortRecords } from '../../Utilities'

class LongTermActual extends Component {

    render() {
        if(this.props.records.length < 3) return <Text>We Need at least three entries</Text>
        const adjustedRecords = this.props.records;
        const data = adjustedRecords.map(item => item.weight && item.weight);
        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 2 }
                    stroke={ userGageToColor(adjustedRecords[index].userWeightGage) }
                    fill={ userGageToColor(adjustedRecords[index].userWeightGage) }
                />
            ))
        }

        const LineCustom = ({ line }) => {
            return (
                <Path
                    d={ line }
                    stroke={ HANSIS_DARK }
                    fill={ 'none' }
                />
            )
        };

        return (
            <View style={ { height: 200 } }>
                <AreaChart
                    style={ { flex: 1 } }
                    data={ data }
                    svg={{ fill: HANSIS_MEDIUM_LIGHT }}
                    curve={shape.curveNatural}
                    contentInset={ { top: 6, bottom: 20,  left: 0, right: 0 } }
                >
                    <Grid/>
                    <LineCustom/>
                    <Decorator/>
                </AreaChart>
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

export default connect(mapStateToProps)(LongTermActual);
