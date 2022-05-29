import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { CustomEntityBase } from "./entityBase";
import { Message } from "./message";
import { User } from "./user";
@Entity("ChatAppConversation")
export class Conversation extends CustomEntityBase {
  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.conversations)
  users: User[];
}
