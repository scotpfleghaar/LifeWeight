import React from "react";
import {HeaderWrapper} from "./Components";
import {StyleSheet, View} from "react-native";
import {connect} from 'react-redux'
import {sortRecords} from './Utilities'
import {ListItem, Button, Icon} from 'react-native-elements'
import {HANSIS_DARK} from "../../Constants";
import firebase from 'firebase'
import { get } from 'lodash'


class SettingsScreen extends React.Component {

    renderLogoutButton() {
        return (
            <View style={{justifyContent: 'center', marginTop: 20}}>
                    <Button
                        title={'Logout'}
                        type={'clear'}
                        titleStyle={{fontSize: 32, color: HANSIS_DARK}}
                        onPress={() => {
                            firebase.auth().signOut().then(() => {
                                this.props.navigation.navigate('Auth')
                            }, (error) => {
                                this.props.navigation.navigate('Auth')
                            });
                        }}
                    />
                </View>
        )
    }
    render() {
        const list = [
            {
                title: 'Weight Goal',
                icon: 'bullseye',
                screen: 'GoalWeight'
            },
            // {
            //     title: 'Extras',
            //     icon: 'star',
            //     screen: 'Extras'
            // }
        ];
        // !this.props.isPremiumUser ? list.push( {
        //         title: 'Premium',
        //         icon: 'check-circle',
        //         screen: 'Profile'
        //     }) : null;
        // onPress={() => this.props.navigation.navigate('Notifications')}
        return (
            <HeaderWrapper
                title={'Settings'}
            >
                <View>
                    {
                        list.map((item, i) => (
                            <ListItem
                                chevron
                                key={i}
                                title={item.title}
                                leftIcon={<Icon
                                    type={'font-awesome'}
                                    name={item.icon}
                                />}
                                bottomDivider={true}
                                onPress={() => item.screen && this.props.navigation.navigate(item.screen)}
                            />
                        ))
                    }
                </View>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        paddingBottom: 110
    }
});

const mapStateToProps = state => {
    const records = get(state, 'app.records', undefined)
    const isPremiumUser = get(state, 'app.isPremiumUser', false)
    return {
        records: sortRecords(records),
        isPremiumUser
    }
};

export default connect(mapStateToProps)(SettingsScreen);