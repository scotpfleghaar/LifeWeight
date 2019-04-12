import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK } from "../../../Constants";
import Icon from 'react-native-vector-icons/FontAwesome';

class LogIn extends Component {
    static navigationOptions = ({navigation}) => {
       return {
           headerRight: (
               <Button
                   title="Sign Up"
                   type="clear"
                   titleStyle={styles.titleStyle}
                   onPress={() => navigation.navigate('SignUp')}
               />
           ),
       }
    };

    render() {
        return (
            <View>
               <Text h1>Login</Text>
               <Input
                    placeholder='Email'
                    leftIconContainerStyle={styles.iconContainerStyle}
                    leftIcon={
                        <Icon
                            name='envelope'
                            size={24}
                            color='black'
                        />
                    }
                    />
                <Input
                    placeholder='Password'
                    leftIconContainerStyle={styles.iconContainerStyle}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        color: HANSIS_MEDIUM_DARK
    },
    iconContainerStyle: {
       width: 52
    }
});


export default LogIn;