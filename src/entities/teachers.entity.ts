import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Courses } from "./courses.entity";
import { Groups } from "./groups.entity";

@Entity()
export class Teachers {
	@PrimaryGeneratedColumn()
	teacher_id: string;

	@Column({
		nullable: false,
		type: "varchar",
		length: 52,
	})
	teacher_fullname: string;

    @Column({
		nullable: false,
		type: "varchar",
		length: 52,
	})
	teacher_speciality: string;

    @Column({
		nullable: false,
		type: "varchar",
		length: 52,
	})
	teacher_work_time: string;

	@ManyToMany(() => Courses, (courses) => courses.teachers)
    @JoinTable()
    courses: Courses[]

	@OneToMany(() => Groups, (groups) => groups.teacher)
	@JoinTable()
	groups: Groups[]
}
