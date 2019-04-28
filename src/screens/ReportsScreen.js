import React from "react";
import {FormButton, HeaderWrapper} from "./Components";
import {ScrollView, StyleSheet, Text, View} from "react-native";
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
import {
    MOVING_AVERAGE_LINE_GRAPH_DESCRIPTION,
    ACTUAL_DATA_LINE_GRAPH_DESCRIPTION,
    WEIGHT_GAIN_LOSS_BAR_GRAPH_DESCRIPTION,
    HOW_OFTEN_YOUR_DIET_IS_FOLLOWED_DESCRIPTION
} from '../../Constants'
import LongTermActual from "./Components/Charts/LongTermActual";

class ReportsScreen extends React.Component {
    render() {
        return (
            <HeaderWrapper
                title={'Charts'}
            >
                { this.props.records.length > 2 ? <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollStyle}>

                     <CollapseableCard
                        title='Moving Average'
                        description={MOVING_AVERAGE_LINE_GRAPH_DESCRIPTION}
                    >
                        <WeightLineChartMovingAverage/>
                    </CollapseableCard>
                    <CollapseableCard
                        title='Actual Weight Records'
                        description={ACTUAL_DATA_LINE_GRAPH_DESCRIPTION}
                    >
                        <WeightLineChartAdvanced/>
                    </CollapseableCard>
                    <CollapseableCard
                        title='Average Weight Gain/Loss'
                        description={WEIGHT_GAIN_LOSS_BAR_GRAPH_DESCRIPTION}
                    >
                        <WeightDietTrandsBarGraph/>
                    </CollapseableCard>
                      <CollapseableCard
                        title='How often your diet is followed'
                        description={HOW_OFTEN_YOUR_DIET_IS_FOLLOWED_DESCRIPTION}
                    >
                        <WeightPieChart/>
                    </CollapseableCard>
                    <CollapseableCard
                        title='Long Term'
                        description={'This shows all check ins all time'}
                    >
                        <LongTermActual/>
                    </CollapseableCard>
                </ScrollView> : (
                    <View style={styles.tempView}>
                        <Text style={styles.textStyle}>{`Records needed for charts to be shown: ${3 - this.props.records.length}`}</Text>
                        <FormButton title={'Add Record?'} onPress={() => this.props.navigation.navigate('Add')}/>
                    </View>
                ) }
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        paddingBottom: 110
    },
    tempView: {
        marginTop: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16
    }
});

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps)(ReportsScreen);