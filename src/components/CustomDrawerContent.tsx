import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constants/colors';
import useAuth from '@/hook/queries/useAuth';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {auth} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <Pressable style={styles.profileContainer}>
          <View style={styles.userImageConainer}>
            <Image
              source={require('@/assets/default-user.png')}
              style={styles.userImage}
            />
          </View>
          <Text style={styles.nickName}>{auth.nickname}</Text>
        </Pressable>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.menuText}>설정</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 5,
    marginTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    gap: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  menuText: {
    fontSize: 15,
  },
  userImageConainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  nickName: {
    fontSize: 14,
  },
});

export default CustomDrawerContent;
