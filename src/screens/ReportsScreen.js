import React from "react";
import {HeaderWrapper} from "./Components";
import {ScrollView, StyleSheet, Text} from "react-native";
import {Card} from "react-native-elements";
import WeightLineChartAdvanced from './Components/Charts/WeightLineChartAdvanced'
import WeightAverageTitle from './Components/Charts/WeightAverageTitle'
import WeightProgressCircle from './Components/Charts/WeightProgressCircle'
import WeightDietTrandsBarGraph from './Components/Charts/WeightDietTrandsBarGraph'
import WeightPieChart from './Components/Charts/WeightPieChart'
import WeightLineChartMovingAverage from './Components/Charts/WeightLineChartMovingAverage'
import CollapseableCard from './Components/CollapseableCard'
import { connect } from 'react-redux'
import { sortRecords } from './Utilities'

class ReportsScreen extends React.Component {
    render() {
        return (
            <HeaderWrapper
                title={'Charts'}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollStyle}>

                     <CollapseableCard
                        title='Moving Average'
                    >
                        <WeightLineChartMovingAverage/>
                    </CollapseableCard>
                    <CollapseableCard
                        title='Trends (Actual)'
                    >
                        <WeightLineChartAdvanced/>
                    </CollapseableCard>
                    <CollapseableCard
                        title='Average Weight Gain/Loss'
                    >
                        <WeightDietTrandsBarGraph/>

                    </CollapseableCard>

                      <CollapseableCard
                        title='Percent Diet is Followed'
                    >
                        <WeightPieChart/>
                    </CollapseableCard>
                </ScrollView>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        paddingBottom: 110
    }
});

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(ReportsScreen);