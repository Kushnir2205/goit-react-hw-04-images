import axios from 'axios';
const API_KEY = '37021483-288521f302817cbccd0ddc5ec';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    key: API_KEY,
  },
});

const getImages = async (query = '', page = 1) => {
  const { data } = await instance.get(`?q=${query}&page=${page}`);

  return data;
};

export { getImages };
