import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'
import { Text, StyleSheet, View } from 'react-native'
import { HANSIS_DARK, HANSIS_MEDIUM_DARK } from '../../../../Constants'

class WeightProgressCircle extends React.PureComponent {

    render() {
        return (
            <View>
                <ProgressCircle
                    style={ { height: 200 } }
                    progress={ 0.7 }
                    progressColor={ HANSIS_MEDIUM_DARK }
                    startAngle={ -Math.PI * 0.8 }
                    endAngle={ Math.PI * 0.8 }
                />

                <Text style={styles.textStyle}>Test</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 24,
        color: HANSIS_DARK,
    }
});

export default WeightProgressCircle