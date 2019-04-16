import React, {Component} from 'react';
import { Overlay, Text } from 'react-native-elements'

class EditWeightOverlay extends Component {
    state;
    constructor(props){
        super(props);
        this.state = {
            isVisible: true
        }
    }
    render() {
        return (
            <Overlay
                isVisible={this.state.isVisible}
                windowBackgroundColor="rgba(255, 255, 255, .5)"
                overlayBackgroundColor="red"
                width="auto"
                height="auto"
            >
                <Text>Hello from Overlay!</Text>
            </Overlay>
        );
    }
}

export default EditWeightOverlay;