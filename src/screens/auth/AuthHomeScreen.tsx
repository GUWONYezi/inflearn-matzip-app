import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackParamList} from '@/types/navigation';
import CustomButton from '@/components/CustomButton';

type Navigation = StackNavigationProp<AuthStackParamList>;

function AuthHomeScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <SafeAreaView>
      <CustomButton
        label="이메일 로그인"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
