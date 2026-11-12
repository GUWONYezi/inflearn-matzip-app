import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import useAuth from '@/hook/queries/useAuth';
import useForm from '@/hook/useForm';
import {validateLogin} from '@/utils/validation';
import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function LoginScreen() {
  const {loginMutation} = useAuth();

  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initiaValue: {email: '', password: ''},
    validate: validateLogin,
  });

  // 로그인 제출
  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          touched={login.touched.email}
          error={login.errors.email}
          submitBehavior="submit"
          returnKeyType="next"
          inputMode="email"
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          touched={login.touched.password}
          error={login.errors.password}
          maxLength={20}
          returnKeyType="join"
          secureTextEntry
          textContentType="oneTimeCode"
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
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
