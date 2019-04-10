import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

class EditWeightScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    EditWeightScreen
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default EditWeightScreen;