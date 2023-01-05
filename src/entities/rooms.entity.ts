import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Groups } from "./groups.entity";

@Entity()
export class Rooms {
	@PrimaryGeneratedColumn()
	room_id: string;

	@Column({
		nullable: false,
		type: "varchar",
		length: 52,
	})
	room_name: string;

	@OneToMany(() => Groups, (groups) => groups.room)
	@JoinColumn()
	groups: Groups[]
}
