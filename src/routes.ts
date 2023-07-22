import { FastifyInstance } from 'fastify';
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function appRoutes(app: FastifyInstance) {

    app.get('/playlists', async () => {
        const playlists = await prisma.playlist.findMany()
        return playlists
    }),

    app.get('/songs', async () => {
        const songs = await prisma.song.findMany()
        return songs
    })

    app.get('/playlists/:id', async (request) => {

        const togglePlaylistParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = togglePlaylistParams.parse(request.query)

        const playlist = await prisma.playlist.findUnique({
            where: {
                id: id,
            }
        })

        const Songs = await prisma.song.findMany({
            where: {
                playlist_id: id
            }
        })

        return {
            playlist,
            Songs
        }
    })


    app.get('/songs/:id', async (request) => {

        const toggleSongParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = toggleSongParams.parse(request.query)

        const song = await prisma.song.findUnique({
            where: {
                id: id,
            }
        })
        return song
    })
}