import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'expo';
import Colors from "../constants/Colors";


  export default class TaskListItem extends React.PureComponent {
    _onPress = () => {
      console.log("_onPress");
      this.props.onPressItem(this.props.task);
    };


    render() {
      return (
        <TouchableHighlight
          onPress={() => this._onPress() }
          underlayColor='#ddd'
        >
          <View style={styles.itemView} >
              <Icon.MaterialIcons
                name='reorder'
                size={24}
                //style={{ marginBottom: -3 }}
                //color={Colors.tabIconSelected}
              />
            <View>
              <Text style={styles.nameText}>{this.props.task.title}</Text>
            </View>
            <View style={styles.caret}>
              <Icon.MaterialIcons
                name='check-box-outline-blank'
                size={36}
                //style={{ marginBottom: -3 }}
                color={Colors.tabIconSelected}
              />
            </View>
          </View>
        </TouchableHighlight>
      )
    }
  }

const styles = StyleSheet.create({
  comtainer: {
    // borderTopColor: 'black',
    // borderTopWidth: 1,
    backgroundColor: 'red'
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
  },
  nameText: {
    fontSize: 18,
    textAlign: 'left',
    //fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 5,
  },
  caret: {
    justifyContent: 'flex-end',
    position:'absolute',
    right:10,
    alignSelf: 'center'
  },
  exhibitImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight:5,
  },


});
