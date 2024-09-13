import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres {

  async getUser(id) {
    return await sql`SELECT * FROM users WHERE id=${id}`
  }

  async listUsers() {
    return await sql`SELECT * FROM users`
  }

  async createUser(user) {
    const id = randomUUID()
    return await sql`INSERT INTO users (id, name, password, profile)
      values (${id}, ${user.name},${user.password},${user.profile})
      `
  }

  async updateUser(id, user) {
    return await sql`UPDATE users SET
      name=${user.name},
      password=${user.password},
      profile=${user.profile}
      WHERE id=${id};`
  }

  async deleteUser(id) {
    return await sql`DELETE FROM users WHERE id=${id};`
  }

}