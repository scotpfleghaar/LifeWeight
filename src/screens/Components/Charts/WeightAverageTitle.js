import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mean } from 'lodash'
import { HANSIS_DARK, WEIGHT_POSTFIX } from '../../../../Constants'
import { sortRecords } from '../../Utilities'
import { connect } from 'react-redux'

class WeightAverageTitle extends Component {
    render() {
        if(this.props.records.length < 3) return <Text>We Need at least three entries</Text>;
        const adjustedRecords = this.props.records.slice(0, 6);
        const data = adjustedRecords.map(item => item.weight && item.weight);
        const tenDayAverage = mean(data).toFixed(1);

        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    {`${tenDayAverage} ${WEIGHT_POSTFIX}`}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 40,
        color: HANSIS_DARK
    }
});

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records).reverse()
    }
};

export default connect(mapStateToProps)(WeightAverageTitle);
