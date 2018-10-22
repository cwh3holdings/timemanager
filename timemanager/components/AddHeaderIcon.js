import React from 'react';
import {TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";
import {Icon} from "expo";

export default class AddHeaderIcon extends React.Component {

  _handlePress() {
    console.log("pressed: " + this.props.onPressParam)
    this.props.navigation.getParam(this.props.onPressParam);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={.8}
        style={{marginRight:20}}
      >
        <Icon.MaterialIcons
          name="playlist-add"
          size={30}
          color={"white"}
        />
      </TouchableOpacity>
    );
  }
}