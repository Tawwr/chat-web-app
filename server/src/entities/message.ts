import { Column, Entity, ManyToOne } from "typeorm";
import { Conversation } from "./conversation";
import { CustomEntityBase } from "./entityBase";
import { User } from "./user";

@Entity("ChatAppMessage")
export class Message extends CustomEntityBase {
  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
