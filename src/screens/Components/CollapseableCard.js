import React from "react";
import {ScrollView, StyleSheet, View, LayoutAnimation, Animated} from "react-native";
import {Card, Text, Button, Divider, Icon} from "react-native-elements";
import { HANSIS_MEDIUM_LIGHT, HANSIS_DARK } from "../../../Constants";

class CollapseableCard extends React.Component {
    state;
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
    }

    CardTitle() {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: HANSIS_DARK, }}>{this.props.title}</Text>
                    <Button
                        onPress={() => {
                            this.setState({
                                isOpen: !this.state.isOpen
                            })
                        }}
                        type="clear"
                        buttonStyle={{height: 18}}
                        icon={
                            <Icon
                                iconStyle={{height: 18}}
                                type='font-awesome'
                                name={this.state.isOpen ? "chevron-up" : "chevron-down"}
                                size={18}
                                color={HANSIS_DARK}
                            />
                        }
                        />
                </View>
            )
        }

    render() {
        return (
            <View style={{overflow: 'hidden', marginBottom: 5}}>
                <Card
                    title={ this.CardTitle() }
                >
                    <View>
                        <Divider style={{ backgroundColor: HANSIS_MEDIUM_LIGHT, height: 1, width: 'auto', marginBottom: 10, marginTop: 10 }} />
                        { this.props.children }
                    </View>
                    <View  style={{height: this.state.isOpen ? 'auto' : 0, overflow: 'hidden', marginTop: 10}}>
                        <Text>{this.props.description}</Text>
                    </View >
                </Card>
             </View>
        );
    }
}

export default CollapseableCard;