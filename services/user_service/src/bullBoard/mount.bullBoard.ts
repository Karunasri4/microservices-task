import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { Express } from "express";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { emailQueue } from "../queues/email.queue";

