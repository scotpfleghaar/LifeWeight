import React, {Component} from 'react';
import {Button, Overlay, Text, Divider, Icon} from 'react-native-elements'
import {Dimensions, StyleSheet, View, Keyboard} from 'react-native'
import {HANSIS_MEDIUM, HANSIS_MEDIUM_LIGHT, HANSIS_MEDIUM_DARK, PURE_WHITE, HANSIS_DARK} from "../../../Constants";

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

class HowWellDidYouFollowYourDietDescription extends Component {
    render() {
        const happyIcon = () => <Icon
            type={'font-awesome'}
            name={'check'}
            color={'green'}
        />

        const sortaIcon = () => <Icon
            type={'font-awesome'}
            name={'minus'}
            color={HANSIS_MEDIUM_DARK}/>

        const sadIcon = () => <Icon
            type={'font-awesome'}
            color={'salmon'}
            name={'times'}/>


        return (
            <View style={styles.containerStyle}>
                <Text h4>Hint:</Text>
                <Divider style={styles.dividerStyle}/>
                <Text>This is a measure if how well you think you did at following your diet since you last checked in.</Text>
                <Divider style={styles.dividerStyle}/>
                <View style={styles.textWrapperStyle}>
                    {happyIcon()}<Text style={styles.textStyle}>Yes!</Text>
                </View>
                <View style={styles.textWrapperStyle}>
                    {sortaIcon()}<Text style={styles.textStyle}>Yes and No</Text>
                </View>
                <View style={styles.textWrapperStyle}>
                    {sadIcon()}<Text style={styles.textStyle}>No</Text>
                </View>
                <Divider style={styles.dividerStyle}/>
                <Text>Its best to be honest with yourself! This information determines helpful and motivational information for you.</Text>
                <Text>This information gets generated into graphs that give you insight into what happens when you
                    follow your diet!</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    textWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'auto',
        height: 30,
        margin: 10
    },

    textStyle: {
        fontSize: 18,
        marginLeft: 10
    },

    dividerStyle: {
        marginBottom: 10,
        marginTop: 10
    },

    containerStyle: {
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
});


export default HowWellDidYouFollowYourDietDescription;