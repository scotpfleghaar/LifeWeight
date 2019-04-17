import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import * as shape from 'd3-shape'
import { HANSIS_DARK, HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT } from '../../../../Constants'
import { userGageToColor, averageTenDayArrayAlgorythem } from '../../Utilities'

class WeightLineChartAdvanced extends React.PureComponent {

    render() {
        if (this.props.records.length === 0) return null
        const adjustedRecords = this.props.records.slice(0, 16);
        const data = adjustedRecords.map(item => item.weight && item.weight);
        const averagedData = averageTenDayArrayAlgorythem(data)
        console.log("averagedData", averagedData)
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

        const Line = ({ line }) => {
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
                        svg={{ fill: 'rgba(34, 128, 176, 0)' }}
                        curve={shape.curveNatural}
                        contentInset={ { top: 6, bottom: 20,  left: -10, right: 6 } }
                    >
                        <Grid/>
                        
                        <Decorator/>
                    </AreaChart>
                   {averagedData.length > 0 && <AreaChart
                            style={ StyleSheet.absoluteFill }
                            data={ averagedData }
                            svg={{ fill: 'rgba(230, 240, 246, 0.5)' }}
                            contentInset={ { top: 20, bottom: 20 } }
                            curve={ shape.curveNatural }
                        >
                        <Line/>
                    </AreaChart>
                         }
                </View>

        )
    }

}

export default WeightLineChartAdvanced