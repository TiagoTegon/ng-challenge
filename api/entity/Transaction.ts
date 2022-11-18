import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Account, (account) => account.id)
  debitedAccount: Account
  
  @ManyToOne(() => Account, (account) => account.id)
  creditedAccount: Account

  @Column({ type: "float" })
  value: number

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date
}