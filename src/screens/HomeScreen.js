import React from "react";
import {HeaderWrapper} from "./Components";
import {ScrollView, StyleSheet, Text} from "react-native";
import {Card} from "react-native-elements";
import WeightLineChartAdvanced from './Components/Charts/WeightLineChartAdvanced'
import WeightAverageTitle from './Components/Charts/WeightAverageTitle'
import WeightProgressCircle from './Components/Charts/WeightProgressCircle'
import { connect } from 'react-redux'
import { sortRecords } from './Utilities'

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
                        title='Your Current Weight'
                    >
                        <WeightAverageTitle records={this.props.records}/>
                    </Card>
                    
                    <Card
                        title='Progress'
                    >
                       <WeightProgressCircle records={this.props.records}/>
                    </Card>

                    <Card
                        title='Trends (Average & Actual)'
                    >
                        <WeightLineChartAdvanced records={this.props.records}/>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


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

export default connect(mapStateToProps)(HomeScreen);