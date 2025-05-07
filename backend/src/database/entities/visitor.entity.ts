import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ReviewEntity } from "./review.entity";
import { MyVendorsEntity } from "./myVendors.entity";
import { GuestListEntity } from "./guestlist.entity";
import { ChecklistEntity } from "./checklist.entity";
import { PaymentEntity } from "./payment.entity";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: "visitor" })
export class VisitorEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Field()
  @Column({ type: "varchar", length: 50, nullable: true })
  visitor_fname?: string;

  @Field()
  @Column({ type: "varchar", length: 50, nullable: true })
  visitor_lname?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  partner_fname?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  partner_lname?: string;

  @Column({ type: "varchar", nullable: true })
  engaged_date?: string;

  @Column({ type: "varchar", nullable: true })
  wed_date?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  wed_venue?: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  profile_pic_url?: string;

  @Column({ type: "varchar", nullable: true })
  phone?: string;

  @Column({ type: "varchar", nullable: true })
  city?: string;

  @OneToMany(() => ReviewEntity, (r) => r.visitor)
  reviews: ReviewEntity[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => MyVendorsEntity, (m) => m.visitor, { cascade: true })
  myVendors: MyVendorsEntity[];

  @OneToMany(() => GuestListEntity, (o) => o.visitor, {
    cascade: true,
    onDelete: "CASCADE",
  })
  guestlist: GuestListEntity[];

  @OneToMany(() => ChecklistEntity, (checklist) => checklist.visitor, {
    cascade: true,
  })
  checklists: ChecklistEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.visitor)
  payments: PaymentEntity[];

  weddingDate: Date;
}
