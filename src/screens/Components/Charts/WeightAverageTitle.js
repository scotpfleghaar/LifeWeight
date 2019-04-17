import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mean } from 'lodash'
import { HANSIS_DARK } from '../../../../Constants'

class WeightAverageTitle extends Component {
    render() {
        const adjustedRecords = this.props.records.slice(0, 11);
        const data = adjustedRecords.map(item => item.weight && item.weight);
        const tenDayAverage = mean(data).toFixed(1)

        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    { tenDayAverage }
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

export default WeightAverageTitle;