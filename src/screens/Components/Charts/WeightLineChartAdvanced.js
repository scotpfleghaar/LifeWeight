import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import * as shape from 'd3-shape'
import { HANSIS_DARK, HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT } from '../../../../Constants'
import { userGageToColor } from '../../Utilities'

class WeightLineChartAdvanced extends React.PureComponent {

    render() {
        const adjustedRecords = this.props.records.slice(0, 16);
        const data = adjustedRecords.map(item => item.weight && item.weight);

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
            <AreaChart
                style={{ height: 200 }}
                data={ data }
                svg={{ fill: HANSIS_MEDIUM_LIGHT }}
                 curve={shape.curveNatural}
                 contentInset={ { top: 6, bottom: 20,  left: -10, right: 6 } }
            >
                <Grid/>
                <Line/>
                <Decorator/>
            </AreaChart>
        )
    }

}

export default WeightLineChartAdvanced