import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSubmission } from "../../utils/types/user";

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        updateUserSubmission(state, action: PayloadAction<{ questionId: string; link: string }>) {
            if (state.user) {
                const submissionIndex = state.user.submissions.findIndex((submission: UserSubmission) => submission.question === action.payload.questionId);
                if (submissionIndex !== -1) {
                    state.user.submissions[submissionIndex].link = action.payload.link;
                } else {
                    state.user.submissions.push({
                        question: action.payload.questionId,
                        link: action.payload.link,
                    });
                }
            }
        },
        clearUser(state) {
            state.user = null;
        },
    },
});

export const { setUserDetails, updateUserSubmission,clearUser } = userSlice.actions;
export default userSlice.reducer;
