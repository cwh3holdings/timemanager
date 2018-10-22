import React from 'react';
import {
  Button,
  Modal,
  View,
} from 'react-native';


export default class AddTaskModal extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleClose = () => {
    console.log("_handleClose")
    this.props.closeModal();
  }

  _handleSave = () => {
    console.log("_handleSave")

    this._handleClose();
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={() => console.log("onRequestClose")}
      >
        <View style={{marginTop: 50}}>
          <Button title={'close'} onPress={this._handleClose } />
          <Button title={'save'} onPress={this._handleSave } />
        </View>
      </Modal>
    );
  }
}


