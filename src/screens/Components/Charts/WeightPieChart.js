import React, { Component } from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line, Text } from 'react-native-svg'
import { percentDietIsFollowed, userGageToColor, sortRecords } from '../../Utilities'
import { connect } from 'react-redux'

class WeightPieChart extends Component {
    render() {
        if(this.props.records.length < 3) return <Text>We Need at least three entries</Text>;
        const data = percentDietIsFollowed(this.props.records);
        const pieData = data
            .map((value, index) => ({
                value,
                svg: { fill: userGageToColor(index) },
                key: `pie-${index}`,
            }));

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
                            { data.value > 0 && `${((Number(pieData[index].value) / this.props.records.length) * 100).toFixed(0)}%`}
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

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(WeightPieChart);