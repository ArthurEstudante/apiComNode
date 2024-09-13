
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):


// GET

server.get('/users', async (request, reply) => {
   return await databasePostgres.listUsers()
})
server.get('/user/:id', async (request, reply) => {
    return await databasePostgres.getUser(request.params.id)
 })

// CREATE

server.post('/users', async (request, reply) => {
    await databasePostgres.createUser(request.body)
    return reply.status(201).send("Usuario criado")
})

// UPDATE

server.put('/users/:id', async (request, reply) => {
    console.log(request.params.id, request.body)
    await databasePostgres.updateUser(request.params.id, request.body)
    return reply.status(200).send("Usuario Atualizado")
} )

// DELETE

server.delete('/users/:id', async (request) => {
    await databasePostgres.deleteUser(request.params.id)
} )

server.listen({
    port: 3333
});
