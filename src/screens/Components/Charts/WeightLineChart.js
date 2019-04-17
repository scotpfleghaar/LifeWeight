import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, Path } from 'react-native-svg'
import {HANSIS_DARK, HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT} from '../../../../Constants'
import { userGageToColor } from '../../Utilities'
import { scaleBand } from 'd3-scale'

class WeightLineChart extends React.PureComponent {

    render() {
        const adjustedRecords = this.props.records.slice(0, 16);
        // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data = adjustedRecords.map(item => item.weight && item.weight);

        return (
            <AreaChart
                style={ { height: 200 } }
                data={ data }
                contentInset={ { top: 4, bottom: 20,  left: -10, right: 6 } }
                curve={shape.curveNatural}
                renderDecorator={({value, index, x, y})=>{
                   return (
                       <Circle
                           key={ index }
                           cx={ x(index)}
                           cy={ y(value) }
                           r={ 4 }
                           stroke={ HANSIS_MEDIUM_LIGHT }
                           fill={ userGageToColor(adjustedRecords[index].userWeightGage) }
                       />
                   )
                }}
                svg={{ fill: HANSIS_MEDIUM_LIGHT }}
            />
        )
    }
}

export default WeightLineChart;