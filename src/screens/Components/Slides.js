
import React , { Component} from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1){
            return (
                <Button
                    title="Onwards!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={ this.props.onComplete }
                />
            )
        }
    }

    renderSlides() {
        this.props.data.map((slide, index) => {
            return (
                <View
                    key={slide.text}
                    style={[
                        styles.slideStyle,
                        { backgroundColor: slide.color }
                    ]}
                >
                    <Text>TESTTEST</Text>
                    <Text style={styles.slideText}>{slide.text}</Text>
                    { this.renderLastSlide(index) }
                </View>
            )
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                //style={{flex: 1}}
                pagingEnabled
            >
                <Text>TESTTEST</Text>
                { this.renderSlides() }
            </ScrollView>
        )
    }
}

const styles = {
    slideText: {
        fontSize: 30,
        color: '#F9F9F9'
    },
    slideStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15
    }
};

export default Slides