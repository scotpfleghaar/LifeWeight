import React, { Component } from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Text } from "react-native-svg";
import { HANSIS_MEDIUM } from '../../../../Constants';
import { averageWeightGainAndLoss, sortRecords } from '../../Utilities'
import { mean } from 'lodash'
import { connect } from 'react-redux'

class WeightDietTrandsBarGraph extends Component {
    render() {
        if(this.props.records.length < 3) return <Text>We Need at least three entries</Text>;
        const adjustedRecords = this.props.records.slice(0, 16);
        const weightAverages = averageWeightGainAndLoss(adjustedRecords);
        const weightLabel = [
            weightAverages.dietSuccess >= 0 ? 'Loss' : 'Gain',
            weightAverages.dietMaintained >= 0 ? 'Loss' : 'Gain',
            weightAverages.dietFail >= 0 ? 'Loss' : 'Gain'
        ];
        const data = [
            {
                value: Math.abs(weightAverages.dietSuccess),
                svg: {
                    fill: 'green',
                },
            },
             {
                value: Math.abs(weightAverages.dietMaintained)
            },
             {
                value: Math.abs(weightAverages.dietFail),
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
                    {`${data.value} ${weightLabel[index]}`}
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

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(WeightDietTrandsBarGraph);
