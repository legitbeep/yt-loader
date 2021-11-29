import { NextApiRequest, NextApiResponse } from 'next';
import { convertUrl } from 'utils/api';
import ytdl from 'ytdl-core';

export default async function getVideo(req: NextApiRequest, res: NextApiResponse) {
    try{
        const videoID = convertUrl(req.body.url as string);
        const response = await ytdl.getInfo(videoID);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json(err);
    }
}