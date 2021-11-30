import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { AppThunk, RootState } from "redux/store";
import {Merge} from 'types/merge';
export interface queueInterface {
    curVideo : IVideo | null | undefined;
    videos: Array<IVideo>;
    status : 'idle' | 'loading' | 'success' | 'error' ;
    error ?: string;
}

type Req = {
    type: "mp4" | "mp3";
    url : string;
}

type Quality = {
    vid : IVideo;
    quality : string;
}

const initialState: queueInterface = {
    videos: [],
    status : "idle",
    curVideo : null,
}

export const getVideo = (req: Req):AppThunk => async(dispatch, getState) => {
    
    dispatch(queueActions.loading())
    // req backend
    try {
        const res = await fetch("http://localhost:3000/api/search-video",{
            method: "POST",
            body : JSON.stringify(req),
        });
        const response = await res.json();
        //const data = convertData();
        const data = {
                image : response.videoDetails.thumbnails[3].url,
                title : response.videoDetails.title,
                videoId: response.videoDetails.videoId,
                format : req.type,
                itag : response.formats,
        }
        const curVideos = getState().queue.videos;
        const contains = curVideos.filter(vid => vid.videoId === data.videoId && vid.format === req.type );
        
        if ( !contains.length )
            dispatch(queueActions.push(data));
        else 
        dispatch(queueActions.success());
    } catch (err) {
        dispatch(queueActions.error("Unable to find relevant results."));
    }
}


export const getAudio = (req: Req):AppThunk => async(dispatch, getState) => {
    
    dispatch(queueActions.loading())
    // req backend
    try {
        const res = await fetch("http://localhost:3000/api/search-audio",{
            method: "POST",
            body : JSON.stringify(req),
        });
        const response = await res.json();
        
        const data = {
                image : response.image,
                title : response.title,
                videoId: response.videoId,
                format : req.type,
                itag : response.itag,
        }
        
        const curVideos = getState().queue.videos;
        const contains = curVideos.filter(vid => vid.videoId === data.videoId && vid.format === req.type );
        
        if ( !contains.length )
            dispatch(queueActions.push(data));
        else 
            dispatch(queueActions.success());
    } catch (err) {
        dispatch(queueActions.error("Unable to find relevant results."));
    }
}

export const download = (vid: IVideo):AppThunk => 
    async ( dispatch, getState ) => {
        try {
            dispatch(queueActions.loading());
            const quality = getState().queue.videos.map(v => {
                if (v.videoId === vid.videoId && v.format === vid.format) return v.quality;
            })
        await fetch("http://localhost:3000/api/download",{
            method : "POST",
            body : JSON.stringify({...vid, quality}),
        })
        dispatch(queueActions.success());
        } catch (err) {
            dispatch(queueActions.error(""));
        }
}

export const queueSlice = createSlice({
    name : "queue",
    initialState,
    reducers : {
        loading : (state) => {
            state.status = "loading"
        },
        clear : (state) => {
            state.videos = [];
        },
        curVideo : (state, action: PayloadAction<IVideo>) => {
            state.curVideo = action.payload || null;
            state.status = "success"
        },
        push : (state, action: PayloadAction<IVideo>) => {
            if ( !state.videos.includes(action.payload as IVideo) ){
                state.videos = [action.payload,...state.videos];
            }
            state.status = 'success';
        },
        pop : (state, action : PayloadAction<IVideo>) => {
            state.videos = state.videos.filter( vid => vid.format !== action.payload.format || vid.videoId !== action.payload.videoId   )
            state.status = "success";
        },
        error : (state, action ?: PayloadAction<string>) => {
            state.status = "error";
            if ( action?.payload ){
                state.error = action.payload;
            }
        },
        success: (state) => {
            state.status = "success";
        },
        changeQuality: (state, action: PayloadAction<Quality>) => {
            const payload = action.payload;
            state.videos = state.videos.map(vid => {
                if ( vid.videoId === payload.vid.videoId && vid.format === payload.vid.format){
                    return { ...vid, quality : payload.quality};
                } return vid;
            })
            state.status = "success";
        }
    },
})

export const queueActions = queueSlice.actions;
export const selectQueue = (state : RootState) => (state.queue)
export default queueSlice.reducer;