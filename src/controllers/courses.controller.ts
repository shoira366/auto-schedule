import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Courses } from "../entities/courses.entity";
import { CustomError } from "../errors/errorHandler";

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const courses = await dataSource.getRepository(Courses).find({
				relations: {
					teachers: true,
					groups: true,
				},
			});

			res.json({
				status: 200,
				data: courses,
			});
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { course_name, duration } = req.body;

			const newCourse = await dataSource
				.createQueryBuilder()
				.insert()
				.into(Courses)
				.values({ course_name, course_duration: duration })
				.returning(["course_id", "course_name", "course_duration"])
				.execute()
				.catch((err) => next(new CustomError(err.message, 503)));
			res.json(newCourse);
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
};
