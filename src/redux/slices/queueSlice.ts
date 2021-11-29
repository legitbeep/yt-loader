import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { AppThunk, RootState } from "redux/store";

export interface queueInterface {
    curVideo : IVideo | null | undefined;
    videos: Array<IVideo>;
    status : 'idle' | 'loading' | 'success' | 'error' ;
}

type req = {
    type: "mp4" | "mp3";
    url : string;
}

const initialState: queueInterface = {
    videos: [],
    status : "idle",
    curVideo : null,
}

export const getVideo = (req: req):AppThunk => async(dispatch, getState) => {
    dispatch(queueActions.loading())
    // req backend
    try {
        const response:Partial<IVideo> = await fetch("http://localhost:3000/api/search-vid",{
            method: "GET",
            body : JSON.stringify(req),
        });
        dispatch(queueActions.curVideo(response as IVideo))
    } catch (err) {
        dispatch(queueActions.error());
    }
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
        push : (state, action: PayloadAction<IVideo>) => {
            if ( !state.videos.includes(action.payload as IVideo) ){
                state.videos = [...state.videos,action.payload];
            }
            state.status = 'success';
        },
        pop : (state, action : PayloadAction<string>) => {
            state.videos = state.videos.filter( vid => vid.id !== action.payload )
            state.status = "success";
        },
        error : (state) => {
            state.status = "error";
        }
    },
})

export const queueActions = queueSlice.actions;
export const selectQueue = (state : RootState) => (state.queue)
export default queueSlice.reducer;