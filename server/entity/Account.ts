import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Transaction } from "./Transaction"

@Entity()
export class Account {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column("float", { default: 100.00 })
    balance: number

    @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
    debitedTransactions: Transaction[]

    @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
    creditedTransactions: Transaction[]
}
