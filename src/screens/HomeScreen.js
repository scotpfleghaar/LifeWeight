import React from "react";
import {HeaderWrapper} from "./Components";
import {ScrollView, StyleSheet, Text} from "react-native";
import {Card} from "react-native-elements";
import DecoratorExample from './Components/Charts/lineChart'

class HomeScreen extends React.Component {
    render() {
        return (
            <HeaderWrapper
                title={'Summary'}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollStyle}>

                    <Card
                        title='Your Weight'
                    >
                        <DecoratorExample/>
                    </Card>

                    <Card
                        title='Progress'
                    >
                        <Text style={{marginBottom: 10}}>
                            Progress
                        </Text>
                    </Card>

                    <Card
                        title='Trends'
                    >
                        <Text style={{marginBottom: 10}}>
                            Trends
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>

                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


                    <Card
                        title='Example'
                    >
                        <Text style={{marginBottom: 10}}>
                            Example Data
                        </Text>
                    </Card>


                </ScrollView>
            </HeaderWrapper>
        );
    }
}

const styles = StyleSheet.create({
    scrollStyle: {
        paddingBottom: 110
    }
});

export default HomeScreen;