import CustomButton from '@/components/common/CustomButton';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import InputField from '@/components/common/InputField';
import PreviewImageList from '@/components/common/PreviewImageList';
import ImageInput from '@/components/post/ImageInput';
import MarkerColorInput from '@/components/post/MarkerColorInput';
import ScoreInput from '@/components/post/ScoreInput';
import {colors} from '@/constants/colors';
import useMutateCreatePost from '@/hook/queries/useMutateCreatePost';
import useForm from '@/hook/useForm';
import {useGetAddress} from '@/hook/useGetAddress';
import useImagePicker from '@/hook/useImagePicker';
import {usePermission} from '@/hook/usePermission';
import {MapStackParamList} from '@/types/navigation';
import {getDateWithSeparator} from '@/utils/date';
import {validateAddPost} from '@/utils/validation';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = StackScreenProps<MapStackParamList, 'AddLocation'>;

function AddLocationsScreen({route}: Props) {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation();

  const {location} = route.params;

  // 인자로 넘어온 위치를 역 지오코딩으로 변환
  const address = useGetAddress(location);

  // 위치 추가 mutate
  const createPost = useMutateCreatePost();

  // 유효성 검사할 필드값 제어
  const postForm = useForm({
    initiaValue: {
      title: '',
      description: '',
      date: new Date(),
      color: colors.PINK_400,
      score: 3,
    },
    validate: validateAddPost,
  });

  // 데이터피커 모달창 오픈 여부
  const [openDate, setOpenDate] = useState<boolean>(false);

  // 이미지 선택 후 이벤트
  const imagePicker = useImagePicker();

  // 저장 이벤트
  const handleSubmit = () => {
    const data = createPost.mutate(
      {
        address,
        ...location,
        ...postForm.values,
        imageUris: imagePicker.imageUris,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );

    console.log('data', data);
  };

  // 사진 접근 권한 체크
  usePermission('PHOTO');

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: inset.bottom + 100,
          },
        ]}>
        <InputField disabed value={address} />
        <CustomButton
          variant="outlined"
          label={
            postForm.values.date
              ? getDateWithSeparator(postForm.values.date, '. ')
              : '날짜 선택'
          }
          onPress={() => setOpenDate(true)}
        />
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
        <MarkerColorInput
          color={postForm.values.color}
          score={postForm.values.score}
          onChangeColor={value => postForm.onChage('color', value)}
        />
        <ScoreInput
          score={postForm.values.score}
          onChangeScore={value => postForm.onChage('score', value)}
        />
        <DatePicker
          modal
          locale="ko"
          mode="date"
          title={null}
          cancelText="취소"
          confirmText="완료"
          date={postForm.values.date}
          open={openDate}
          onConfirm={date => {
            console.log('date', date);
            postForm.onChage('date', date);
            setOpenDate(false);
          }}
          onCancel={() => setOpenDate(false)}
        />
        <View style={{flexDirection: 'row'}}>
          <ImageInput onChange={imagePicker.handleChangeImage} />
          <PreviewImageList
            imageUris={imagePicker.imageUris}
            onDelete={imagePicker.delete}
            showDeleteButton={true}
          />
        </View>
      </ScrollView>
      <FixedBottomCTA lable="저장" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
});

export default AddLocationsScreen;
