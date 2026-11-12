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

export {createPost, getPost, getPosts};
