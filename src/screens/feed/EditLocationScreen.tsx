import CustomButton from '@/components/common/CustomButton';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import InputField from '@/components/common/InputField';
import PreviewImageList from '@/components/common/PreviewImageList';
import ImageInput from '@/components/post/ImageInput';
import MarkerColorInput from '@/components/post/MarkerColorInput';
import ScoreInput from '@/components/post/ScoreInput';
import useGetPost from '@/hook/queries/useGetPost';
import useMutateUpdatePost from '@/hook/queries/useMutateUpdatePost';
import useForm from '@/hook/useForm';
import {useGetAddress} from '@/hook/useGetAddress';
import useImagePicker from '@/hook/useImagePicker';
import {FeedStackParamList} from '@/types/navigation';
import {getDateWithSeparator} from '@/utils/date';
import {validateAddPost} from '@/utils/validation';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {default as React, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = StackScreenProps<FeedStackParamList, 'EditLocation'>;

function EditLocationScreen({route}: Props) {
  const inset = useSafeAreaInsets();

  const navigation = useNavigation();

  const {id} = route.params;
  const {data: post} = useGetPost(id);
  const postForm = useForm({
    initiaValue: {
      title: post?.title ?? '',
      description: post?.description ?? '',
      score: post?.score ?? 3,
      date: post?.date ? new Date(post.date) : new Date(),
      color: post?.color ?? '',
    },
    validate: validateAddPost,
  });

  // 인자로 넘어온 위치를 역 지오코딩으로 변환
  const address = useGetAddress({
    latitude: post?.latitude as number,
    longitude: post?.longitude as number,
  });

  // 데이터피커 모달창 오픈 여부
  const [openDate, setOpenDate] = useState<boolean>(false);

  // 이미지 선택 후 이벤트
  const imagePicker = useImagePicker({initiaImages: post?.imageUris ?? []});
  const updatePost = useMutateUpdatePost();

  const handleSubmit = () => {
    updatePost.mutate(
      {
        id,
        body: {
          ...postForm.values,
          imageUris: imagePicker.imageUris,
        },
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

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

export default EditLocationScreen;
