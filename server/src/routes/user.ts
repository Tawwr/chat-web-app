import express from "express";
import { User } from "../entities/user";
import { isAuthenticated } from "../middleware/auth";
import { AuthenticatedRequest } from "../types";
import { caseInsensitiveQuery } from "../utils";

const router = express.Router();

//TODO: In future only return friends for user

/**
 * Get Friends for user
 */
router.get(
  "/friends",
  isAuthenticated,
  async (req: AuthenticatedRequest, res) => {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

/**
 * Get All conversations for user
 */
router.get(
  "/conversations",
  isAuthenticated,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { conversations } = await User.findOne({
        where: {
          email: caseInsensitiveQuery(req.email),
        },
        relations: {
          conversations: {
            messages: {
              sender: true,
            },
            users: true,
          },
        },
      });

      return res.status(200).json(conversations);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

export { router as userRouter };
