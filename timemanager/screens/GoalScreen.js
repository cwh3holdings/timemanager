import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AddHeaderIcon from "../components/AddHeaderIcon";

export default class GoalScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    var goal =  navigation.getParam('goal');

    return {
      title: goal ? goal.title : "Goal",
      headerRight: (
        <AddHeaderIcon
          onPress={navigation.getParam('addTaskItem')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      goalList: null,
    }
  }


  componentDidMount() {
  }

  _clearAllItems = async() => {
    //await AsyncStorage.removeItem('goalList');
  }


  _itemSelected(item) {
    console.log("select: " + item.title)
  }


  _renderHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Tasks</Text>
      </View>
    );
  }


  render() {
    const goal = this.props.navigation.getParam('goal');


    return (
      <View style={styles.container}>
        <Text>Goal Screen: {goal.title} </Text>
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
  listHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  listHeaderText: {
    textAlign: 'center',
    fontSize: 24,
  },
});
