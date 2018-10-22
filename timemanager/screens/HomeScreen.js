import React from 'react';
import {
  AsyncStorage,
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AddHeaderIcon from "../components/AddHeaderIcon";
import AddGoalModal from "./AddGoalModal";
import GoalListItem from "../components/GoalListItem";

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Time Manager',
      headerRight: (
        <AddHeaderIcon
          onPress={navigation.getParam('addGoalItem')}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      addGoalItemModalShowing: false,
      goalList: null,
    }

    // for testing
   // this._clearAllItems();

    this._itemSelected = this._itemSelected.bind(this);
    this._loadGoalList = this._loadGoalList.bind(this);
    this._loadGoalList();
  }


  componentDidMount() {
    this.props.navigation.setParams({ addGoalItem: this._addGoalItem });
  }

  _clearAllItems = async() => {
    await AsyncStorage.removeItem('goalList');
  }

  _loadGoalList = async() => {

    console.log("getting goalList");
    var goalList =  await AsyncStorage.getItem('goalList');
    console.log(goalList);
    goalList =  JSON.parse(goalList);
    await this.setState({goalList: goalList});
  };


  _addGoalItem = () => {
    console.log("add item");
    this.setState({
      addGoalItemModalShowing: true,
    });
  };

  _closeAddGoalItemModal = () => {
    this._loadGoalList().then( () =>
      this.setState({
        addGoalItemModalShowing: false,
      })
    ).catch(error => console.log(error));
  };

  _itemSelected(item) {
    console.log("select: " + item.title)
    this.props.navigation.navigate('Goal', {
      goal: item
    });
  }

  _renderHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Pick a goal to achieve</Text>
      </View>
    );
  }


  render() {
    console.log("HomeScreen.render: " + JSON.stringify(this.state.goalList));


    return (
      <View style={styles.container}>
        {
          (this.state.goalList) ?
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <FlatList
                data={this.state.goalList}
                renderItem={({item}) => <GoalListItem item={item} onPressItem={ this._itemSelected } />}
                ListHeaderComponent={this._renderHeader}
              />
            </ScrollView>
            :
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <Text>No items yet</Text>
            </ScrollView>
        }
        <AddGoalModal
          visible={this.state.addGoalItemModalShowing}
          closeModal={this._closeAddGoalItemModal}
          goalList={this.state.goalList}
        />

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
