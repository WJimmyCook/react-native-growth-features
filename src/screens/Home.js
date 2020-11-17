import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import ShareableReactImage from './ShareableReactImage';

const Home = ({ componentId }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ShareableReactImage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;
