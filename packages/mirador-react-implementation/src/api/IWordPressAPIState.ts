export interface IWordPressAPIState {
  content: {
    rendered: string,
  },
  error: null,
  id: string,
  isLoading: boolean,
  posts: [{
    _embedded: any,
    excerpt: string,
    date: string,
    id: number,
    title: string,
  }],
  title: {
    rendered: string,
  },
}
