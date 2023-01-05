import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Groups } from "./groups.entity";
import { Teachers } from "./teachers.entity";

@Entity()
export class Courses {
	@PrimaryGeneratedColumn()
	course_id: string;

	@Column({
		nullable: false,
		type: "varchar",
		length: 52,
	})
	course_name: string;

	@Column({
		nullable: false,
		type: "varchar",
		length: 96,
	})
	course_duration: string;

	@ManyToMany(() => Teachers, (teachers) => teachers.courses)
    teachers: Teachers[]

	@OneToMany(() => Groups, (groups) => groups.course)
	@JoinColumn()
	groups: Groups
}
