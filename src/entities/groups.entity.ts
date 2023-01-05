import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Courses } from "./courses.entity";
import { Rooms } from "./rooms.entity";
import { Teachers } from "./teachers.entity";

@Entity()
export class Groups {
	@PrimaryGeneratedColumn()
	group_id: string;

	@Column({
		nullable: false,
		type: "varchar",
		length: 52,
	})
	group_name: string;

	@Column({
		nullable: true,
		type: "varchar",
		length: 120,
	})
	duration: string;

	@Column({
		nullable: true,
		type: "varchar",
		length: 120
	})
	week_days: string;

	@ManyToOne(() => Courses, (courses) => courses.groups)
	@JoinColumn()
	course: Courses;

	@ManyToOne(() => Teachers, (teacher) => teacher.groups)
	@JoinColumn()
	teacher: Teachers;

	@ManyToOne(() => Rooms, (room) => room.groups)
	@JoinColumn()
	room: Rooms;
}
