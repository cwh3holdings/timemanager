import React from 'react';
import {
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AddHeaderIcon from "../components/AddHeaderIcon";
import AddTaskModal from "./AddTaskModal";
import TaskListItem from "../components/TaskListItem";

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
      taskList: this.props.navigation.getParam('goal').tasks,
      addTaskItemModalShowing: false,
      goal: this.props.navigation.getParam('goal'),
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ addTaskItem: this._openAddTaskModal });
  }

  _openAddTaskModal = () => {
    this.setState({
      addTaskItemModalShowing: true,
    });
  };

  _closeAddTaskModal = () => {

    AsyncStorage.getItem(this.state.goal.key).then( item => {
      this.setState({
        goal: item,
        taskList: item.tasks,
        addTaskItemModalShowing: false,
      });
    });
  };
  

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
    const goal = this.state.goal;


    return (
      <React.Fragment>

      <View style={styles.container}>
        <Text>Goal Screen: {goal.title} </Text>
        <FlatList
          data={this.state.taskList}
          renderItem={({item}) => <TaskListItem task={item} onPressItem={ this._itemSelected } />}
          ListHeaderComponent={this._renderHeader}
        />
      </View>

        <AddTaskModal
          visible={this.state.addTaskItemModalShowing}
          goal={goal}
          closeModal={this._closeAddTaskModal}
        />
      </React.Fragment>
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
