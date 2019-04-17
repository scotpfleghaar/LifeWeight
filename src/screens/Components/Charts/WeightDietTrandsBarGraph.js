import React from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Text } from "react-native-svg";
import { HANSIS_MEDIUM } from '../../../../Constants';
import { averageWeightGainAndLoss } from '../../Utilities'
import { mean } from 'lodash'

class WeightDietTrandsBarGraph extends React.PureComponent {

    render() {

        const weightAverages = averageWeightGainAndLoss(this.props.records)
        console.log(weightAverages)
        const data = [
            {
                value: Math.abs(mean(weightAverages.dietSuccess).toFixed(2)),
                svg: {
                    fill: 'green',
                },
            },
             {
                value: Math.abs(mean(weightAverages.dietMaintained).toFixed(2))
            },
             {
                value: Math.abs(mean(weightAverages.dietFail).toFixed(2)),
                svg: {
                    fill: 'salmon',
                },
            }
        ]

        const CUT_OFF = 10

        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((data, index) => (
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ data.value < CUT_OFF ? y(data.value) - 10 : y(data.value) + 15 }
                    fontSize={ 14 }
                    fill={ data.value >= CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {data.value}
                </Text>
            ))
        )

        return (
            <BarChart
                style={{ height: 200 }}
                data={data}
                gridMin={0}
                svg={{ fill: HANSIS_MEDIUM }}
                yAccessor={({ item }) => item.value}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Labels/>
                <Grid/>
            </BarChart>
        )
    }

}

export default WeightDietTrandsBarGraph