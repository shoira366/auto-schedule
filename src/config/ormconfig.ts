import path from "path";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	password: "shoira",
	database: "postgres",
	username: "postgres",
	synchronize: true,
	entities: [path.join(__dirname, "..", "entities", "*.entity.ts")],
});
