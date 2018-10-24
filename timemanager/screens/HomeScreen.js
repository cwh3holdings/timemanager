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
      keyIndex: 0,
      activeRow: null,
    };

    // for testing
    //this._clearAllItems();

    this._itemSelected = this._itemSelected.bind(this);
    this._loadGoalList = this._loadGoalList.bind(this);

    this._loadGoalList();
  }


  componentDidMount() {
    this.props.navigation.setParams({ addGoalItem: this._addGoalItem });
  }

  _clearAllItems = async() => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log("key: " + key);
          console.log("value: " + value);

          if (key.startsWith('goal_')) {
            AsyncStorage.removeItem(key);
          }
        }, this);
        this.setState({
          goalList: null,
          keyIndex: 0,
        });
      });
    });
  };

  _loadGoalList = () => {
    console.log("_loadGoalList entyer");

    var goalList = [];

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        var keyIndex = 0;
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log("key: " + key);
          console.log("value: " + value);

          if (key.startsWith('goal_')) {
            var idx = JSON.parse(value).index;
            console.log("idx: " + idx);
            if (idx > keyIndex) {
              keyIndex = idx;
            }
            goalList.push(JSON.parse(value));
          }
        }, this);
        goalList.sort(function(a, b){
          let idxA = parseInt(a.index);
          let idxB = parseInt(b.index);
          return idxA - idxB;
        });
        this.setState({
          goalList: goalList,
          keyIndex: keyIndex,
        });
      });
    });
  };


  _addGoalItem = () => {
    console.log("add item");
    this.setState({
      addGoalItemModalShowing: true,
    });
  };

  _closeAddGoalItemModal = () => {
    this.setState({
      goalList: null,
      addGoalItemModalShowing: false,
    } , () => {
      this._loadGoalList();
    });
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


  onSwipeOpen(item, rowId, direction) {
    this.setState({ activeRow: item.key });
  }

  onSwipeClose(item, rowId, direction) {
    if (item.key === this.state.activeRow && typeof direction !== 'undefined') {
      this.setState({ activeRow: null });
    }
  }

  render() {
    console.log("HomeScreen.render: " + JSON.stringify(this.state.goalList));


    return (
      <View style={styles.container}>
        {
          (this.state.goalList) ?
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
              <FlatList
                data={this.state.goalList}
                renderItem={({item}) => <GoalListItem item={item} onPressItem={ this._itemSelected } />}
                ListHeaderComponent={this._renderHeader}
                extraData={this.state.activeRow}
              />
            </View>
            :
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <Text>No items yet</Text>
            </ScrollView>
        }
        <AddGoalModal
          visible={this.state.addGoalItemModalShowing}
          closeModal={this._closeAddGoalItemModal}
          keyIndex={this.state.keyIndex}
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
    paddingTop: 10,
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
