// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession, Handler } from "next-iron-session";
import withSession from "@/lib/middleware/session";

type Data = {
  name: string
}

export default withSession(async (req, res) => {
    const { code, state } = req.query;

    const clientBuffer = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, 'utf-8');
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', process.env.RETURN_TO as string);

    const response = await axios.post<any>(
        'https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${clientBuffer.toString('base64')}`
            }
        }
    );

    const userResponse = await axios.get<any>(
        `https://api.spotify.com/v1/me`,
        {
            headers: {
                'Authorization': `Bearer ${response.data.access_token}`
            }
        }
    );

    req.session.set('user', {
        'accessToken': response.data.access_token,
    })

    await req.session.save();

    res.status(200).redirect('/')
});