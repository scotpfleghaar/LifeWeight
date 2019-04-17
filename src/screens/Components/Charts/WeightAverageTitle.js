import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

class WeightAverageTitle extends Component {
    render() {
        const adjustedRecords = this.props.records.slice(0, 16);
        const data = adjustedRecords.map(item => item.weight && item.weight);

        return (
            <View style={styles.container}>
                <Text>
                    WeightAverageTitle
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
    }
});

export default WeightAverageTitle;