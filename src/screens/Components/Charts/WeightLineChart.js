import React from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import { HANSIS_MEDIUM_LIGHT, HANSIS_DARK } from '../../../../Constants';

class WeightLineChart extends React.PureComponent {

    render() {

        const data = [ 200, 199, 197.5, 196, 195.55, 194, 196, 195, 194, 192 ]

        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ HANSIS_DARK }
                    fill={ 'white' }
                />
            ))
        }
        const Line = ({ line }) => (
            <Path
                d={ line }
                stroke={ HANSIS_DARK }
                fill={ 'none' }
            />
        )

        return (
            <AreaChart
                style={{ height: 250 }}
                data={ data }
                svg={{ fill: HANSIS_MEDIUM_LIGHT }}
                contentInset={{ top: 20, bottom: 30 }}
            >
                <Grid/>
                <Line/>
                <Decorator/>
            </AreaChart>
        )
    }

}

export default WeightLineChart