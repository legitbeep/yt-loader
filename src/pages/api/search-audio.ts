import { NextApiRequest, NextApiResponse } from 'next';
import { convertUrl } from 'utils/api';
import ytdl from 'ytdl-core';

export default async function getAudio(req: NextApiRequest, res: NextApiResponse) {
    try{
        const request = JSON.parse(req.body);
        const videoId = convertUrl(request.url);
        
        const response = await ytdl.getInfo(videoId);
        const formats = ytdl.filterFormats(response.formats, "audioonly");

        const audioData =  {
            image : response.videoDetails.thumbnails[3].url,
            title : response.videoDetails.title,
            itag: formats,
            videoId,
        }

        res.status(200).json(audioData);
    } catch (err) {
        res.status(400).json(err)
    }
}