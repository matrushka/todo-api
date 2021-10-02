const { TEST_DATABASE_URL, DATABASE_URL, NODE_ENV = "development" } = process.env;

let databaseUrlString;
if (NODE_ENV === "test") {
  if (!DATABASE_URL) throw new Error("TEST_DATABASE_URL environment variable not defined.");
  databaseUrlString = TEST_DATABASE_URL;
} else {
  if (!DATABASE_URL) throw new Error("DATABASE_URL environment variable not defined.");
  databaseUrlString = DATABASE_URL;
}

const databaseUrl = new URL(databaseUrlString);

const PATH_SEPERATOR = "/";
const {
  protocol,
  username,
  password,
  hostname: host,
  port,
  pathname = PATH_SEPERATOR,
  searchParams: params,
} = databaseUrl;

if (protocol !== "postgresql:") throw new Error(`Unsupported DB protocol: ${protocol}`);
const [_, database] = pathname.split(PATH_SEPERATOR);

const TYPEORM_CONFIG = {
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  // Always use migrations to avoid unwanted changes
  synchronize: false,
  logging: false,
  migrationsRun: NODE_ENV === "test",
  schema: params.get("schema"),
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

module.exports = TYPEORM_CONFIG;
