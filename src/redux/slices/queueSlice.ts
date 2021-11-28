import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { AppThunk, RootState } from "redux/store";

export interface queueInterface {
    curVideo : IVideo | null | undefined;
    videos: Array<IVideo>;
    status : 'idle' | 'loading' | 'success' | 'error' ;
}

const initialState: queueInterface = {
    videos: [],
    status : "idle",
    curVideo : null,
}

export const getVideo = (name: string):AppThunk => async(dispatch, getState) => {
    // dispatch(queueActions.loading())
    // req backend
    // try {
    //     const response = {};
    //     dispatch(queueActions.curVideo(response))
    // } catch (err) {
    //     dispatch(queueActions.error(err));
    // }
}

export const queueSlice = createSlice({
    name : "queue",
    initialState,
    reducers : {
        loading : (state) => {
            state.status = "loading"
        },
        curVideo : (state, action: PayloadAction<IVideo>) => {
            state.curVideo = action.payload || null;
            state.status = "success"
        },
        push : (state) => {
            if ( state.curVideo && !state.videos.includes(state.curVideo as IVideo) ){
                state.videos = [...state.videos,state.curVideo];
            }
            state.status = 'success';
        },
        pop : (state, action : PayloadAction<IVideo>) => {
            state.videos = state.videos.filter( vid => vid.id !== action.payload.id )
            state.status = "success";
        },
        error : (state) => {
            state.status = "error";
        }
    },
})

export const queueActions = queueSlice.actions;
export const getQueue = (state : RootState) => ({...state.queue})
export default queueSlice.reducer;