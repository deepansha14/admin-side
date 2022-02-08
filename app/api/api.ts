import axios, { AxiosResponse } from 'axios';
import {PostType} from '../models/post.interface';

const instance = axios.create({
  baseURL: 'http://165.232.178.247:5000/api/',
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Post = {
	getPosts: (): Promise<PostType[]> => requests.get('product/getAll'),
	getAPost: (id: number): Promise<PostType> => requests.get(`product/get/${id}`),
	createPost: (post: PostType): Promise<PostType> =>
		requests.post('product/new', post),
	updatePost: (post: PostType, id: number): Promise<PostType> =>
		requests.put(`product/get/${id}`, post),
	deletePost: (id: number): Promise<void> => requests.delete(`product/get/${id}`),
};