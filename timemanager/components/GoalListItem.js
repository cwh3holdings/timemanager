import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'expo';


  export default class GoalListItem extends React.PureComponent {
    _onPress = () => {
      console.log("_onPress");
      this.props.onPressItem(this.props.item);
    };


    render() {
      return (
        <TouchableHighlight
          onPress={() => this._onPress() }
          underlayColor='#ddd'
        >
          <View
            style={styles.itemView}
          >
            <View>
              <Text style={styles.nameText}>{this.props.item.title}</Text>
            </View>
            <View style={styles.caret}>
              <Icon.MaterialIcons
                name='chevron-right'
                size={36}
                //style={{ marginBottom: -3 }}
                //color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
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
    right:0,
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
