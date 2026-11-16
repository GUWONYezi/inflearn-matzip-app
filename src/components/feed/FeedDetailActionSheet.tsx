import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ActionSheet} from '../common/ActionSheet';
import useMutateDeletePost from '@/hook/queries/useMutateDeletePost';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/types/navigation';

interface FeedDetailActionSheetProps {
  id: number;
  isVisible: boolean;
  hideAction: () => void;
}

type Navigation = StackNavigationProp<FeedStackParamList>;

function FeedDetailActionSheet({
  id,
  isVisible,
  hideAction,
}: FeedDetailActionSheetProps) {
  const navigation = useNavigation<Navigation>();
  const deletePost = useMutateDeletePost();

  // 삭제하기 핸들러
  const handleDeletePost = () => {
    Alert.alert('삭제하시겠습니까?', '피드와 지도에서 모두 삭제됩니다.', [
      {
        text: '삭제',
        onPress: () => {
          deletePost.mutate(id, {
            onSuccess: () => {
              hideAction();
              navigation.goBack(); // 삭제 성공 시 뒤로 가기
            },
          });
        },
        style: 'destructive',
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  // 수정 페이지 이동 핸들러
  const handleEditPost = () => {
    navigation.navigate('EditLocation', {id});
    hideAction();
  };

  return (
    <ActionSheet isVisible={isVisible} hideAction={hideAction}>
      <ActionSheet.Background>
        <ActionSheet.Container>
          <ActionSheet.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </ActionSheet.Button>
          <ActionSheet.Divider />
          <ActionSheet.Button onPress={handleEditPost}>
            수정하기
          </ActionSheet.Button>
        </ActionSheet.Container>
        <ActionSheet.Container>
          <ActionSheet.Button onPress={hideAction}>취소</ActionSheet.Button>
        </ActionSheet.Container>
      </ActionSheet.Background>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({});

export default FeedDetailActionSheet;
