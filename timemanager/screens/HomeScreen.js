import React from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AddHeaderIcon from "../components/AddHeaderIcon";
import AddTaskModal from "./AddTaskModal";

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Time Manager',
      headerRight: (
        <AddHeaderIcon
          onPress={navigation.getParam('addItem')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    // this._addItem = this._addItem.bind(this);

    this.state = {
      addItemModalShowing: false,
    }
  }


  componentDidMount() {
    this.props.navigation.setParams({ addItem: this._addItem });
  }

  _addItem = () => {
    console.log("add item");
    this.setState({
      addItemModalShowing: true,
    });
  };

  _closeAddItemModal = () => {
    this.setState({addItemModalShowing: false});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>Home screen goes here</Text>
        </ScrollView>
        <AddTaskModal
          visible={this.state.addItemModalShowing}
          closeModal={this._closeAddItemModal}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
