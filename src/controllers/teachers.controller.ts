import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Courses } from "../entities/courses.entity";
import { Teachers } from "../entities/teachers.entity";
import { CustomError } from "../errors/errorHandler";

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const teachers = await dataSource.getRepository(Teachers).find({
				relations: {
					courses: true,
					groups: true,
				},
				where: {
					courses: {
						course_id: id,
					},
				},
			});

			if (id) {
				return res.json(teachers);
			} else {
				return res.json([]);
			}
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { fullname, speciality, work_time, course_id } = req.body;

			const newTeacher = new Teachers();

			newTeacher.teacher_fullname = fullname;
			newTeacher.teacher_speciality = speciality;
			newTeacher.teacher_work_time = work_time;

			const findCourse = await dataSource
				.getRepository(Courses)
				.findOne({ where: { course_id } });

			if (findCourse) {
				newTeacher.courses = [findCourse];
				await dataSource.manager.save(newTeacher);
			} else {
				return res.json({
					status: 503,
					message: "no such course exists",
				});
			}

			res.json(newTeacher);
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
	PUT: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const findTeacher = await dataSource
				.getRepository(Teachers)
				.findOne({ where: { teacher_id: id } });

			res.send('ok')
			
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
};
