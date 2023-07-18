import { FastifyInstance } from 'fastify';
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function appRoutes(app: FastifyInstance) {
    app.get('/', () => {
        return "Hello, World";
    })
}