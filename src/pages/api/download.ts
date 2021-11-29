import { NextApiRequest, NextApiResponse } from "next";
import { convertUrl } from "utils/api";
import ytdl from "ytdl-core";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {itag, title, type, videoId} = req.query;
        const vidId = convertUrl(videoId as string);
        if (type === "mp4"){
            res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);
            res.setHeader("Content-Type","video/mp4");
        } else {
            res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
            res.setHeader("Content-Type","audio/mp3");
        }
        ytdl(vidId, { filter: (format) => (format.itag === parseInt(itag as string))}).pipe(res);
    } catch (err) {
        res.status(400).json(err)
    }
}