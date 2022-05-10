import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 450, nullable: false })
  email: string

  @Column({ length: 450, nullable: false })
  passwd: string

  @Column({ length: 450, nullable: false })
  role: string // root, user

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswd(): Promise<void> {
    if (this.passwd) {
      this.passwd = await bcrypt.hash(this.passwd, 10)
    }
  }

  @BeforeInsert()
  setCreatedDate(): void {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  setUpdatedDate(): void {
    this.updatedAt = new Date()
  }

  async checkPassword(passwd: string): Promise<boolean> {
    return bcrypt.compare(passwd, this.passwd)
  }
}
