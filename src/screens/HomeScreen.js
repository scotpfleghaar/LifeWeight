import React from "react";
import {HeaderWrapper} from "./Components";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Card} from "react-native-elements";
import WeightAverageTitle from './Components/Charts/WeightAverageTitle'
import WeightLineChartMovingAverage from './Components/Charts/WeightLineChartMovingAverage'
import WeightGoalTimeline from './Components/Charts/WeightGoalTimeline'
import Slides from './Components/Slides'

import {connect} from 'react-redux'
import {sortRecords} from './Utilities'

class HomeScreen extends React.Component {
    render() {
        return (
            <HeaderWrapper
                title={'Overview'}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollStyle}>

                    <Card
                        title='Current Weight'
                    >
                        <WeightAverageTitle/>
                    </Card>

                    <Card
                        title='Goal Timeline'
                    >
                        <WeightGoalTimeline/>
                    </Card>

                    {this.props.records.length > 2 ? <Card
                        title='Moving Average'
                    >
                        <WeightLineChartMovingAverage/>
                    </Card> : null }
                </ScrollView>
            </HeaderWrapper>
        );
    }
}

const
    styles = StyleSheet.create({
        scrollStyle: {
            paddingBottom: 110
        }
    });

const
    mapStateToProps = state => {
        const {records} = state.app;
        return {
            records: sortRecords(records)
        }
    };

export default connect(mapStateToProps)(HomeScreen);