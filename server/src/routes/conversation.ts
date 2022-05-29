import express from "express";
import { In } from "typeorm";
import { Conversation } from "../entities/conversation";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { isAuthenticated } from "../middleware/auth";
import { AuthenticatedRequest } from "../types";
import { findUserByEmail } from "../utils";

const router = express.Router();

/**
 * Create A Conversation
 */
router.post("/", isAuthenticated, async (req: AuthenticatedRequest, res) => {
  try {
    const { name, users: userIds }: { name?: string; users: string[] } =
      req.body;

    const user = await findUserByEmail(req.email);

    const users = await User.find({
      where: { id: In([...userIds, user.id]) },
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: "Please provide a list of valid users",
      });
    }

    let conversationName = name;
    if (!name || name === "") {
      conversationName = users.map((user) => user.firstName).join(", ");
    }

    const conversation = Conversation.create({
      name: conversationName,
      users,
    });
    await conversation.save();

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * Get A Conversation by Id
 */
router.get("/:id", isAuthenticated, async (req: AuthenticatedRequest, res) => {
  try {
    const id = +req.params.id;

    const conversation = await Conversation.findOne({
      where: { id },
      relations: {
        users: true,
        messages: { sender: true },
      },
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    const isUserInConversation = conversation.users
      .map((u) => u.email)
      .includes(req.email);
    if (!isUserInConversation) {
      return res.status(404).json({
        message: `User doesn't have access to conversation`,
      });
    }

    return res.json(conversation);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * Add a message to a conversation
 */
router.post(
  "/:id/message",
  isAuthenticated,
  async (req: AuthenticatedRequest, res) => {
    try {
      const id = +req.params.id;
      const { body } = req.body;

      const conversation = await Conversation.findOne({
        where: { id },
        relations: {
          users: true,
        },
      });

      if (!conversation) {
        return res.status(404).json({
          message: "Conversation not found",
        });
      }

      const sender = await findUserByEmail(req.email);

      const isUserInConversation = conversation.users
        .map((u) => u.email)
        .includes(req.email);
      if (!isUserInConversation) {
        return res.status(404).json({
          message: `User doesn't have access to conversation`,
        });
      }

      const message = Message.create({
        conversation,
        body,
        sender,
      });

      console.log({ message });

      await message.save();

      return res.status(200).json(message);
    } catch (error) {
      console.log({ error });
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

export { router as conversationRouter };
