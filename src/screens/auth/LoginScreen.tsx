import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hook/useForm';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function LoginScreen() {
  const login = useForm({
    initiaValue: {email: '', password: ''},
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          touched={login.touched.email}
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          touched={login.touched.password}
          secureTextEntry
          textContentType="oneTimeCode"
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton label="로그인" variant="filled" size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
