import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("token")
export class Token {

  @PrimaryGeneratedColumn({ name: "token_id", type: "int" })
  tokenId: number;

  @Column({ name: "user_id", type: "int", nullable: true })
  userId: number | null;

  @Column({ name: "user_role", type: "varchar", nullable: true, length: 100 })
  userRole: string | null;

  @Column({ name: "token", type: "text" })
  token: string;

  @Column({ name: "expires_at", type: "datetime"})
  expiresAt: Date;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({name: "is_valid", type: "tinyint", nullable: true, width: 1,default: () => "'1'",})
  isValid: boolean | null;

}