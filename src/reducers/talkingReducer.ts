import {createSlice} from '@reduxjs/toolkit';

export interface TalkingState {
  isTalking: boolean;
}

const initialState: TalkingState = {
  isTalking: false,
};

export const talkingSlice = createSlice({
  name: 'talking',
  initialState,
  reducers: {
    startedTalking: state => {
      state.isTalking = true;
    },
    stopedTalking: state => {
      state.isTalking = false;
    },
  },
});

export const {startedTalking, stopedTalking} = talkingSlice.actions;

export default talkingSlice.reducer;
