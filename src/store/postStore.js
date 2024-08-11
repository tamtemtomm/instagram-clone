import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],

  // Add the new post
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),

  // Filter the post by id
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),

  // Bruh, set the posts
  setPosts: (posts) => set({ posts }),

  // Add comment to the post who have the same Id
  addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
}));

export default usePostStore;
