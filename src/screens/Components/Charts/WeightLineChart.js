import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle } from 'react-native-svg'
import {HANSIS_DARK, HANSIS_MEDIUM_LIGHT } from '../../../../Constants'
import { userGageToColor } from '../../Utilities'

class WeightLineChart extends React.PureComponent {

    render() {

        // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data = this.props.records.map(item => item.weight && item.weight);

        console.log(data);
        return (
            <AreaChart
                style={ { height: 200 } }
                data={ data }
                contentInset={ { top: 30, bottom: 30 } }
                curve={shape.curveNatural}
                renderDecorator={({value, index, x, y})=>{
                   return (
                       <Circle
                           key={ index }
                           cx={ x(index)}
                           cy={ y(value) }
                           r={ 4 }
                           stroke={ HANSIS_DARK }
                           fill={ userGageToColor(this.props.records[index].userWeightGage) }
                       />
                   )
                }}
                svg={{ fill: HANSIS_MEDIUM_LIGHT }}
            />
        )
    }
}

export default WeightLineChart;