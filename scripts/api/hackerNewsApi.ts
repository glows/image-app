const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStories = async (): Promise<number[]> => {
  const response = await fetch(`${BASE_URL}/topstories.json`);
  return response.json();
};

export const fetchStory = async (id: number): Promise<Story> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
};

export const fetchComment = async (id: number): Promise<Comment> => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
};