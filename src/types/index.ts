type Podcast = {
  podcast: string;
  episode_number: number;
  text: string;
  speaker: string;
  _hash: string;
  num_words: number;
  embedding: null;
};

type SearchRequestBody = {
  query: string;
  filters?: {
    podcast?: string;
  };
};
