import { NextApiRequest, NextApiResponse } from 'next';
import { convertUrl } from 'utils/api';
import ytdl from 'ytdl-core';

export default async function getVideo(req: NextApiRequest, res: NextApiResponse) {
    try{
        const request = JSON.parse(req.body);
        const videoId = convertUrl(request.url);
        const response = await ytdl.getInfo(videoId);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json(err);
    }
}