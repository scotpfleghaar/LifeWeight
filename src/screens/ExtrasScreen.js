import React, {Component} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {HeaderWrapper} from "./Components";

class ExtrasScreen extends Component {
    render() {
        return (
            <HeaderWrapper
                title={'Disclaimer'}
                goBackCallBack={this.props.navigation.goBack}
            >
                <View style={styles.container}>
                    <Text>
                        LifeWeight provides general information about health and related subjects. The information and other content provided by LifeWeight, are not intended and should not be construed as medical advice, nor is the information a substitute for professional medical expertise or treatment.
                        If you or any other person has a medical concern, you should consult with your health care provider or seek other professional medical treatment. If you think you may have a medical emergency, call your doctor or emergency services immediately.
                        The information provided by LifeWeight have no relation to those of any academic, hospital, health practice or other institution.
                    </Text>
                </View>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
});


export default ExtrasScreen;