import { createConnection, getConnection } from "typeorm";

const connection = {
  auto() {
    beforeAll(async () => {
      await connection.create();
    });

    afterAll(async () => {
      await connection.close();
    });

    beforeEach(async () => {
      await connection.clear();
    });
  },

  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name);
        const query = `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE`;
        await repository.query(query);
      })
    );
  },
};

export default connection;
