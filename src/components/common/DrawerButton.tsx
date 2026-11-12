import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {MainDrawerParamList} from '@/types/navigation';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constants/colors';

type Navigation = DrawerNavigationProp<MainDrawerParamList>;

interface DrawerButtonProps {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

function DrawerButton({style, color = colors.BLACK}: DrawerButtonProps) {
  const navigation = useNavigation<Navigation>();

  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      style={[styles.container, style]}>
      <Ionicons name="menu" size={25} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});

export default DrawerButton;
