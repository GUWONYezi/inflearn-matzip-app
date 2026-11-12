import {Image} from 'react-native-image-crop-picker';

// 이미지를 폼 데이터로 가져오기
function getFormDataImages(key: string = 'images', images: Image[]) {
  const formData = new FormData();

  images.forEach(({path, mime}) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(), // 맨 뒤의 글자
    };

    formData.append(key, file);
  });

  return formData;
}

export {getFormDataImages};
