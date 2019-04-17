import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import { ListItem } from 'react-native-elements'
import { HeaderWrapper, FormButton } from "./Components";
import { connect } from 'react-redux'
import { WEIGHT_POSTFIX, HANSIS_MEDIUM_DARK, MONTHS } from '../../Constants'
import EditWeightOverlay from "./Components/EditWeightOverlay";
import { sortRecords } from './Utilities'

class RecordedWeightsScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentItemBeingEdited: ''
        }
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            onPress={() => this.setState({currentItemBeingEdited: item})}
            title={`${String(item.weight)} ${WEIGHT_POSTFIX}`}
            subtitle={`${MONTHS[item.date.month - 1]} ${item.date.day}`}
            leftIcon={this.renderLeftIcon(item.userWeightGage)}
            rightIcon={{ name: 'edit', type: 'font-awesome' }}
        />
    );

    renderLeftIcon(userWeightGage){
        switch(String(userWeightGage)){
            case '0':
                return {
                    type: 'font-awesome',
                    name : 'check',
                    color: 'green'
                };
            case '1':
                return {
                        type: 'font-awesome',
                        name : 'minus',
                        color: HANSIS_MEDIUM_DARK
                };
            default:
                return {
                    type: 'font-awesome',
                    name : 'times',
                    color: 'salmon'
                }
        }
    }

    render () {
        const isThereAList = this.props.records.length > 0;
        return (
            <HeaderWrapper
                title={'Records'}
            >
                <EditWeightOverlay item={this.state.currentItemBeingEdited} doneEditing={() => {this.setState({currentItemBeingEdited: ''})}}/>
                {!isThereAList ?
                    <View style={{alignItems: 'center',justifyContent: 'center'}}>
                        <FormButton title={'Add Record?'} onPress={() => this.props.navigation.navigate('Add')}/>
                    </View>
                    :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollStyle}
                        keyExtractor={this.keyExtractor}
                        data={this.props.records}
                        renderItem={this.renderItem}
                    />}
            </HeaderWrapper>
        )
    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        paddingBottom: 110
    }
});

const mapStateToProps = state => {
    const { records } = state.app;
    return {
        records: sortRecords(records)
    }
};

export default connect(mapStateToProps, {})(RecordedWeightsScreen);