import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hook/useForm';
import {validateSignup} from '@/utils/validation';
import {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const singup = useForm({
    initiaValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });

  // 회원가입 제출
  const handleSubmit = () => {
    console.log('singup.values', singup.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          touched={singup.touched.email}
          error={singup.errors.email}
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          returnKeyType="next"
          inputMode="email"
          {...singup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          touched={singup.touched.password}
          error={singup.errors.password}
          submitBehavior="submit"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          returnKeyType="next"
          secureTextEntry
          textContentType="oneTimeCode"
          {...singup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          touched={singup.touched.passwordConfirm}
          error={singup.errors.passwordConfirm}
          returnKeyType="join"
          secureTextEntry
          textContentType="oneTimeCode"
          onSubmitEditing={handleSubmit}
          {...singup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton
        label="회원가입"
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

export default SignupScreen;
