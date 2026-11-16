import {Post} from '@/types/domain';
import axiosInstance from './axios';

// 포스트 정보 생성
async function createPost(body: Omit<Post, 'id'>): Promise<Post> {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
}

// 포스트 정보 가져오기
async function getPost(id: number): Promise<Post> {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
}

// 포스트 목록 조회
async function getPosts(page = 1): Promise<Post[]> {
  const {data} = await axiosInstance.get(`/posts?page=${page}`);

  return data;
}

// 즐겨찾기 목록
async function getFavoritePosts(page = 1): Promise<Post[]> {
  const {data} = await axiosInstance.get(`/favorites?page=${page}`);

  return data;
}

// 포스트 삭제
async function deletePost(id: number) {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
}

type RequestUpdatePost = {
  id: number;
  body: Omit<Post, 'id' | 'longitude' | 'latitude' | 'address'>;
};

// 포스트 수정
async function updatePost({id, body}: RequestUpdatePost): Promise<Post> {
  const {data} = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
}

async function updateFavoritePost(id: number): Promise<number> {
  const {data} = await axiosInstance.post(`/favorites/${id}`);

  return data;
}

export {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
  updateFavoritePost,
  getFavoritePosts,
};
