import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class User {

  constructor(username: string, password: string, account: Account) {
    this.username = username
    this.password = password
    this.account = account
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account

}