import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OutboxModel {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	type: string;

	@Column('jsonb')
	payload: object;

	@Column()
	occurredAt: Date;

	@Column({ default: false })
	published: boolean;
}
