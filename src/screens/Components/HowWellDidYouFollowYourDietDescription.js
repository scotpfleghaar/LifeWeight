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
               <Text>How well did you follow your diet since you last checked in?</Text>
                <View style={styles.textWrapperStyle}>
                        {happyIcon()}<Text style={styles.textStyle}>Nailed it!</Text>
                </View>
                <View style={styles.textWrapperStyle}>
                        {sortaIcon()}<Text style={styles.textStyle}>Moderately</Text>
                </View>
                <View style={styles.textWrapperStyle}>
                        {sadIcon()}<Text style={styles.textStyle}>did not follow</Text>
                </View>
                <Text>This helps determine helpful and motivational information for you.</Text>
                <Text>This information gets generated into graphs that give you insight into what happens when you follow your diet!</Text>
        </View>
        );
    }
}



const styles = StyleSheet.create({
        textWrapperStyle: {
            flexDirection: 'row',
             justifyContent: 'space-between',
             alignContent: 'center',
             width: 150,
             height: 30
        },

        textStyle: {
            fontSize: 30
        },

        containerStyle: {
            margin: 10,
            justifyContent: 'center'
        }
});



export default HowWellDidYouFollowYourDietDescription;