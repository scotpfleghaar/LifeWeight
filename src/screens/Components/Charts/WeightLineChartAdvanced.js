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

class WeightLineChartAdvanced extends Component {

    renderChart() {
        if (this.props.records.length < 3) return <Text>We Need at least three entries</Text>;
            const adjustedRecords = this.props.records.slice(0, 16);
            const data = adjustedRecords.map(item => item.weight && item.weight);
            const averagedData = averageTenDayArrayAlgorythem(data);
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

            const LineCustom = ({ line }) => {
                return (
                    <Path
                        d={ line }
                        stroke={ HANSIS_DARK }
                        fill={ 'none' }
                    />
                )
            }

            return (
                <View style={ { height: 200 } }>
                        <AreaChart
                            style={ { flex: 1 } }
                            data={ data }
                            svg={{ fill: HANSIS_MEDIUM_LIGHT }}
                            curve={shape.curveNatural}
                            contentInset={ { top: 6, bottom: 20,  left: -10, right: 5 } }
                        >
                            <Grid/>
                            <LineCustom/>
                            <Decorator/>
                        </AreaChart>
                    </View>

            )
        }

    render() {
        return this.renderChart()
    }
}

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(WeightLineChartAdvanced);



//   {averagedData.length > 0 && <AreaChart
//                                 style={ StyleSheet.absoluteFill }
//                                 data={ averagedData }
//                                 svg={{ fill: 'rgba(34, 128, 176, .15)' }}
//                                 contentInset={ { top: 6, bottom: 20,  left: -10, right: 5 } }
//                                 curve={ shape.curveNatural }
//                             >
//                         </AreaChart>
//                          }