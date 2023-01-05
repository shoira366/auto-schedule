import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Rooms } from "../entities/rooms.entity";
import { CustomError } from "../errors/errorHandler";

export default {
	GET: async (_: Request, res: Response, next: NextFunction) => {
		try {
			const rooms = await dataSource.getRepository(Rooms).find({
				relations: {
					groups: true
				}
			});

			res.json({
				status: 200,
				data: rooms,
			});
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		const { room_name } = req.body;
		const newRoom = await dataSource
			.createQueryBuilder()
			.insert()
			.into(Rooms)
			.values({ room_name: room_name })
			.returning(["room_id", "room_name"])
			.execute()
			.catch((err) => next(new CustomError(err.message, 503)));
		res.json(newRoom);
	},
};
