import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hook/useForm';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SignupScreen() {
  const singup = useForm({
    initiaValue: {email: '', password: '', passwordConfirm: ''},
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          touched={singup.touched.email}
          {...singup.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          touched={singup.touched.password}
          secureTextEntry
          textContentType="oneTimeCode"
          {...singup.getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          touched={singup.touched.passwordConfirm}
          secureTextEntry
          textContentType="oneTimeCode"
          {...singup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" variant="filled" size="large" />
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
