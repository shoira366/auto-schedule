import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Courses } from "../entities/courses.entity";
import { Groups } from "../entities/groups.entity";
import { Rooms } from "../entities/rooms.entity";
import { Teachers } from "../entities/teachers.entity";
import { CustomError } from "../errors/errorHandler";

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const groups = await dataSource.getRepository(Groups).find({
				relations: {
					course: true,
					teacher: true,
					room: true
				},
				where: {
					course: {
						course_id: id,
					},
				},
			});

			const findGroups = groups.filter((e) => e.duration == null)

			findGroups ? res.json(findGroups) : []			

		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { group_name, course_id } = req.body;

			const newGroup = await dataSource
				.createQueryBuilder()
				.insert()
				.into(Groups)
				.values({
					group_name,
					course: course_id,
				})
				.returning(["group_id", "group_name", "course_id"])
				.execute();
			res.json(newGroup);
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
	PUT: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const { teacher_id, room_id } = req.body;

			const findGroup = await dataSource.getRepository(Groups).findOne({
				relations: {
					course: true,
					teacher: true,
					room: true
				},
				where: { group_id: id },
			});

			findGroup.teacher = teacher_id;
			findGroup.room = room_id;

			const findTeacher = await dataSource
				.getRepository(Teachers)
				.findOne({
					relations: {
						groups: true,
					},
					where: {
						teacher_id,
					},
				});

			const findRoom = await dataSource.getRepository(Rooms).findOne({
				relations: {
					groups: true,
				},
				where: {
					room_id,
				},
			});

			const teachTime =
				Number(
					findTeacher.teacher_work_time.split("-")[
						findTeacher.teacher_work_time.split("-").length - 1
					]
				) - 0;

			const courseDuration = Number(
				findGroup.course.course_duration.split(" ")[0]
			);

			const teachGroups: Array<any> = [];
			const roomGroups: Array<any> = [];
			const hours: Array<any> = [];

			findTeacher.groups.filter((e) =>
				e.duration != null
					? teachGroups.push(...e.duration.split("-"))
					: null
			);

			findRoom.groups.filter((e) =>
				e.duration != null
					? roomGroups.push(...e.duration.split("-"))
					: null
			);

			if (teachGroups.length || roomGroups.length != 0) {
				hours.push(...teachGroups, ...roomGroups);

				const max = Math.max(...hours);

				if (max < teachTime) {
					const duration = [
						max + ".00",
						max + courseDuration + ".00",
					].join("-");
					findGroup.week_days = 'Dush-Chor-Juma'
					findGroup.duration = duration;
					await dataSource.manager.save(findGroup);
				} else {
					const first =
						Number(findTeacher.teacher_work_time.split("-")[0]) - 0;
					const duration = [
						first + ".00",
						first + courseDuration + ".00",
					].join("-");
					findGroup.week_days = 'Sesh-Pay-Shanba'
					findGroup.duration = duration;
					await dataSource.manager.save(findGroup);
				}
			} else if (roomGroups.length == 0) {

				const max = Math.max(...teachGroups)

				console.log(teachGroups.length);
				
				

				const first =
					Number(findTeacher.teacher_work_time.split("-")[0]) - 0;
				const duration = [
					first + ".00",
					first + courseDuration + ".00",
				].join("-");
				findGroup.week_days = 'Dush-Chor-Juma'
				findGroup.duration = duration;
				// console.log(first);
				
				await dataSource.manager.save(findGroup);
			} else if (teachGroups.length == 0){
				const max = Math.max(...roomGroups);

				console.log(roomGroups);
				

				if (max < teachTime) {
					const duration = [
						max + ".00",
						max + courseDuration + ".00",
					].join("-");
					findGroup.week_days = 'Dush-Chor-Juma'
					findGroup.duration = duration;
					await dataSource.manager.save(findGroup);
				} else {
					const first =
						Number(findTeacher.teacher_work_time.split("-")[0]) - 0;
					const duration = [
						first + ".00",
						first + courseDuration + ".00",
					].join("-");
					findGroup.week_days = 'Sesh-Pay-Shanba'
					findGroup.duration = duration;
					await dataSource.manager.save(findGroup);
				}
			}
			
			res.send(findGroup);
		} catch (err) {
			next(new CustomError(err.message, 503));
		}
	},
};
