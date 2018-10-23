import React from 'react';
import {
  AsyncStorage,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {MonoText} from "../components/StyledText";


export default class AddGoalModal extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor");

    this.state = {
      goalTitle: '',
    }

  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  _handleClose = () => {
    console.log("_handleClose")
    this.props.closeModal();
  };


  _createKey() {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var key = "goal_";
    for (var i = 0; i < 32; i++)
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log("key: " + key);

    return key
  }

  _handleSave = async () => {
    console.log("_handleSave");

    var newGoal = (
      {
        key: this._createKey(),
        title: this.state.goalTitle,
        tasks: [],
      }
    );

    await AsyncStorage.setItem(newGoal.key, JSON.stringify(newGoal));


    this.state = {
      goalTitle: '',
    };

    this._handleClose();
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => console.log("onRequestClose")}
      >
        <View
          style={styles.blankArea}
          onStartShouldSetResponder={this._handleClose}
        />
        <View style={styles.closeArea}>

          <View style={styles.closeButton}>
            <Button title={'cancel'} onPress={this._handleClose } />
          </View>

          <View style={styles.modalTitle}>
           <Text allowFontScaling={true} style={{fontSize: 18}}>Add a new goal</Text>
          </View>
          <View style={styles.saveButton}>
            <Button title={'save'} onPress={this._handleSave } />
          </View>

        </View>
        <View style={styles.container}>
            <Text style={{fontSize: 24, marginTop: 20,}}>Name of the Goal</Text>
            <View style={styles.inputTextView}>
            <TextInput
              style={styles.inputText}
              onChangeText={(goalTitle) => this.setState({goalTitle})}
              value={this.state.goalTitle}
            />
            </View>

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  closeArea: {
    flex: 0,
    alignItems: 'flex-start',
   justifyContent: 'space-between',
    flexDirection: 'row',
    //height: 50,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 5,
  },
  closeButton: {
    //alignSelf: 'flex-start'
  },
  saveButton: {
   // alignSelf: 'flex-end'
  },
  blankArea : {
    height: 50,
    opacity: .5,
    backgroundColor: '#000',
  },
  modalTitle: {
    alignSelf: 'center',
  },

  inputTextView: {
    flexDirection: 'row',
    padding: 10,
    flex: 1,
  },

  inputText: {
    height: 40,
    width: 200,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 18,
    textAlign: 'center',
  }
});

