import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Account {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column("float", { default: 100.00 })
    balance: number
}
