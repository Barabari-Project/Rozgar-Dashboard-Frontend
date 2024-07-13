import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseDetails } from "../../utils/types/course";

interface CourseState {
    course: ICourseDetails | null;
}

const initialState: CourseState = {
    course: null,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourseDetails(state, action: PayloadAction<ICourseDetails>) {
            state.course = action.payload;
        },
    },
});

export const { setCourseDetails } = courseSlice.actions;
export default courseSlice.reducer;
