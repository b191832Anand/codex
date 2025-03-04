import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Resume, ResumeState } from "../../types";
axios.defaults.withCredentials = true;
import { toast } from "react-hot-toast";

// List all Resumes
export const getResumes = createAsyncThunk("getresumes", async () => {
	const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/resume/getposts`);
	return response.data.resumes; // Returning only the resumes array
});

// Delete Resume
export const deleteResume = createAsyncThunk("deleteresume", async ({ _id, userId }: any) => {
	await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/resume/deletepost/${_id}/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return { _id };
});

// Add Resume
export const addResume = createAsyncThunk("addresume", async (newPost: any) => {
	const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/resume/create`, newPost, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.data; // Returning only the newly added resume data
});

const initialState: ResumeState = {
	isLoading: false,
	data: [],
	isError: false,
};

const resumeSlice = createSlice({
	name: "Resume",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Get Resume
		builder.addCase(getResumes.fulfilled, (state, action: PayloadAction<Resume[]>) => {
			state.isLoading = false;
			state.data = action.payload;
		});

		builder.addCase(getResumes.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(getResumes.rejected, (state) => {
			state.isError = true;
			console.log("Some error occurred");
		});

		// Add Resume
		builder.addCase(addResume.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(addResume.fulfilled, (state, action: PayloadAction<Resume>) => {
			state.isLoading = false;
			toast.success("Resume added successfully");
			state.data.push(action.payload);
		});

		builder.addCase(addResume.rejected, (state) => {
			state.isError = true;
			toast.error("Failed to add resume");
			console.log("Some error occurred while adding resume");
		});

		// Delete Resume
		builder.addCase(deleteResume.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(deleteResume.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
			state.isLoading = false;
			toast.success("Resume deleted successfully");
			state.data = state.data.filter((post) => post._id !== action.payload._id);
		});

		builder.addCase(deleteResume.rejected, (state) => {
			state.isError = true;
			toast.error("Failed to delete resume");
			console.log("Some error occurred");
		});
	},
});

export default resumeSlice.reducer;
