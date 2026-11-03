import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useForm from '@/hook/useForm';
import {useGetAddress} from '@/hook/useGetAddress';
import {MapStackParamList} from '@/types/navigation';
import {validateAddPost} from '@/utils/validation';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationsScreen({route}: Props) {
  const {location} = route.params;

  const address = useGetAddress(location);

  const postForm = useForm({
    initiaValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField disabed value={address} />
      <CustomButton variant="outlined" label="날짜 선택" />
      <InputField
        placeholder="제목을 입력하세요"
        error={postForm.errors.title}
        touched={postForm.touched.title}
        {...postForm.getTextInputProps('title')}
      />
      <InputField
        multiline
        placeholder="기록하고 싶은 내용을 입력하세요."
        error={postForm.errors.description}
        touched={postForm.touched.description}
        {...postForm.getTextInputProps('description')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationsScreen;
