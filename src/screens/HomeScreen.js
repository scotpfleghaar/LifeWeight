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
    onSlidesComplete = () => {
        this.props.nagivation.navigate('Add')
    };

    renderScenario() {
        const SLIDE_DATA = [
            {
                text: 'Welcome to JobApp',
                color: '#03A9F4'
            },
            {
                text: 'Helping you Land your Next Job',
                color: '#009688'
            },
            {
                text: 'Set your location than swipe away',
                color: '#03A9F4'
            }
        ];

        return this.props.records > 3 ? (
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

                    <Card
                        title='Moving Average'
                    >
                        <WeightLineChartMovingAverage/>
                    </Card>
                </ScrollView>
        ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Slides
                    onComplete={this.onSlidesComplete}
                    data={SLIDE_DATA}
                />
            </View>
        )
    }


    render() {
        return (
            <HeaderWrapper
                title={'Overview'}
            >
                { this.renderScenario() }
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