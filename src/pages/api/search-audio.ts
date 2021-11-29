import { NextApiRequest, NextApiResponse } from 'next';
import { convertUrl } from 'utils/api';
import ytdl from 'ytdl-core';

export default async function getAudio(req: NextApiRequest, res: NextApiResponse) {
    try{
        const videoID = convertUrl(req.body.url as string);
        const response = await ytdl.getInfo(videoID);
        const formats = ytdl.filterFormats(response.formats, "audioonly");
        res.status(200).json(formats);
    } catch (err) {
        res.status(400).json(err)
    }
}