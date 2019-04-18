import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line, Text } from 'react-native-svg'
import { percentDietIsFollowed, userGageToColor } from '../../Utilities'

class WeightPieChart extends React.PureComponent {
    render() {

        const data = percentDietIsFollowed(this.props.records);

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: { fill: userGageToColor(index) },
                key: `pie-${index}`,
            }))

        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <G key={ index }>
                        <Text
                            key={index}
                            x={pieCentroid[ 0 ]}
                            y={pieCentroid[ 1 ]}
                            fill={'white'}
                            textAnchor={'middle'}
                            alignmentBaseline={'middle'}
                            fontSize={18}
                            stroke={'black'}
                            strokeWidth={0.2}
                        >
                            {`${((Number(pieData[index].value) / this.props.records.length) * 100).toFixed(0)}%`}
                        </Text>
                    </G>
                )
            })
        }

        return (
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                spacing={0}
                outerRadius={ '95%' }
            >
                <Labels/>
            </PieChart>
        )
    }

}

export default WeightPieChart