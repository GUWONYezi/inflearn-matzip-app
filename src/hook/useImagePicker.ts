import {getFormDataImages} from '@/utils/imageFile';
import useMutateImages from './queries/useMutateImages';
import ImagePicker from 'react-native-image-crop-picker';
import {useState} from 'react';
import {ImageUri} from '@/types/domain';
import Toast from 'react-native-toast-message';

function useImagePicker() {
  // 이미지 서버에 업로드 api
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>([]);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  // 이미지 삭제 이벤트
  const deleteImageUri = (uri: String) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  console.log('imageUris', imageUris);

  const handleChangeImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        // 이미지 업로드
        uploadImages.mutate(formData, {
          onSuccess: data => {
            addImageUris(data);
          },
        });
      })
      .catch(error => {
        if (error.code != 'E_PICKER_CANCELLED') {
          Toast.show({
            type: 'error',
            text1: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
        }
      });
  };

  return {imageUris, handleChangeImage, delete: deleteImageUri};
}

export default useImagePicker;
