import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DrawerButton from '@/components/DrawerButton';

function MapHomeScreen() {
  return (
    <SafeAreaView>
      <DrawerButton />
      <Text>MapHomeScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MapHomeScreen;
