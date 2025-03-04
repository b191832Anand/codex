import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Post, AddPostPayload } from "../../types";
axios.defaults.withCredentials = true;

// Fetch posts
export const getPosts = createAsyncThunk<Post[]>("getPosts", async () => {
	const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blog/getposts`);
	return response.data.posts;
});

// Delete post
export const deletePost = createAsyncThunk<void, { _id: string; userId: string }>("deletepost", async ({ _id, userId }) => {
	await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/blog/deletepost/${_id}/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
});

// Add post
export const addPost = createAsyncThunk<Post, { newPost: AddPostPayload }>("addpost", async ({ newPost }) => {
	const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/blog/create`, newPost, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data;
});

interface BlogState {
	data: Post[];
	isLoading: boolean;
	isError: boolean | null;
}

const initialState: BlogState = {
	data: [],
	isLoading: false,
	isError: false,
};

const blogSlice = createSlice({
	name: "Blog",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Get posts
		builder.addCase(getPosts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(getPosts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getPosts.rejected, (state) => {
			state.isError = true;
			console.log("some error occurred");
		});

		// Add post
		builder.addCase(addPost.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addPost.fulfilled, (state, action) => {
			state.isLoading = false;
			toast.success("Post added successfully");
			state.data.push(action.payload);
		});
		builder.addCase(addPost.rejected, (state) => {
			state.isError = true;
			toast.error("Could not add post");
			console.log("some error occurred");
		});

		// Delete post
		builder.addCase(deletePost.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deletePost.fulfilled, (state, action) => {
			state.isLoading = false;
			const deletedPostId = action.meta.arg._id; // Assuming action.meta.arg contains the arguments passed to the thunk
			state.data = state.data.filter((post) => post._id !== deletedPostId);
			toast.success("Post deleted successfully");
		});
		builder.addCase(deletePost.rejected, (state) => {
			toast.error("Couldn't delete post");
			state.isError = true;
			console.log("some error occurred");
		});
	},
});

export default blogSlice.reducer;
