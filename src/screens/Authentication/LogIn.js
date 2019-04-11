import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { HANSIS_MEDIUM_LIGHT } from "../../../Constants";

class LogIn extends Component {
    static navigationOptions = ({navigation}) => {
       return {
           headerRight: (
               <Button
                   title="Sign Up"
                   type="clear"
                   buttonStyles={styles.buttonStyle}
                   onPress={() => navigation.navigate('SignUp')}
               />
           ),
       }
    };

    render() {
        return (
            <View>
                <Text>
                    LogIn
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        color: HANSIS_MEDIUM_LIGHT
    }
});


export default LogIn;