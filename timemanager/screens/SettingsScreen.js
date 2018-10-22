import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {ScrollView, StyleSheet, Text, View} from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>About screen goes here</Text>
        </ScrollView>
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
