import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import {HeaderWrapper} from "./Components";
import { PricingCard } from 'react-native-elements'
import { HANSIS_MEDIUM_DARK } from '../../Constants'
import * as RNIap from 'react-native-iap';
import {get} from 'lodash'
import { connect } from 'react-redux'
import { storePurchaseFirebase } from '../Redux/Actions'

class UserSettingsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            purchasableItems: []
        }
    }

    componentDidMount() {
         const items = Platform.select({
            ios: [
                'com.example.productId'
            ],
            android: [
                'com.example.productId'
            ]
        });
        RNIap.initConnection();
        RNIap.getProducts(items).then((products) => {
             // handle success of fetch product list
            this.setState({
                purchasableItems: products
            })
        }).catch((error) => {
            console.log(error.message);
        })
    }

    pruchaseProduct(productId) {
        const deviceType = Platform.select({
            ios: [
                'ios'
            ],
            android: [
                'android'
            ]
        });
        if (productId) {
             RNIap.buyProduct(productId).then(purchase => {
                this.setState({
                        receipt: purchase.transactionReceipt
                });
                this.props.storePurchaseFirebase(deviceType, purchase.transactionReceipt)
            }).catch((error) => {
                console.log(error.message);
            })
        } else {
            console.log('Issue Purchasing Item')
        }
    }

    renderPricingOptions(){
        if( get(this, 'state.purchasableItems', false ) && this.state.purchasableItems.length > 0) {
           return this.state.purchasableItems.map(product => {
                return (
                    <PricingCard
                        color={HANSIS_MEDIUM_DARK}
                        title={product.title}
                        price={product.localizedPrice}
                        info={[product.description]}
                        button={{ title: 'SUBSCRIBE' }}
                        onButtonPress={() => this.pruchaseProduct(product.productId)}
                    />
                )
            })
        } else {
            return <Text style={{marginTop: 10}}>No products at this moment</Text>
        }
    }
    render() {

         const disclaimer = Platform.select({
            ios: [
                'Cancel subscription any time. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period by going to your iOS Account Settings after purchase. Payment will be charged to iTunes Account. Any unused portion of free trial period, if offered, will be forfeited when you purchase a subscription.'
            ],
            android: [
                'No Data Yet'
            ]
        });

        return (
            <HeaderWrapper
                title={'Premium'}
                goBackCallBack={this.props.navigation.goBack}
            >
             <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollStyle}>
                    <View style={styles.container}>
                        { this.renderPricingOptions() }
                        <Text style={{margin: 20}}>
                            {disclaimer}
                        </Text>
                    </View>
                </ScrollView>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
     scrollStyle: {
        paddingBottom: 110
    }
});


export default connect(null, {storePurchaseFirebase})(UserSettingsScreen);