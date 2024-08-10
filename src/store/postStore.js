import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],

  // Add the new post
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),

  // Filter the post by id
  deletePost: (id) => set((state) =>({posts: state.posts.filter(post => post.id !== id)}) ),
  
  // addComment

  // Bruh, set the posts
  setPosts: (posts) => set({posts})
}));

export default usePostStore;