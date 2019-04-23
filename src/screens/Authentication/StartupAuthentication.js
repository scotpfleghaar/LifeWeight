import React from 'react';
import firebase from 'firebase'
import { connect } from 'react-redux'
import { weightRecordsFetch } from '../../Redux/Actions'
import {
    ActivityIndicator, StyleSheet,
    View,
} from 'react-native';


class StartupAuthentication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        loading: true,
        authenticated: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.weightRecordsFetch(() => {
                    this.props.navigation.navigate('App');
                })
            } else {
               this.props.navigation.navigate('Auth');
            }
        });
    }

     render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default connect(null, { weightRecordsFetch })(StartupAuthentication);