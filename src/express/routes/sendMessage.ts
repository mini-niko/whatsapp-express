import { Request, Response, Router, text } from "express";
import { WhatsappClient } from "../../whatsapp/type";
import { MessageMedia } from "whatsapp-web.js";

const router = Router();

type PostBody = {
  chat_id: string;
  message: {
    text?: string;
    media?: {
      type: string;
      data: string;
      name: string;
    };
  };
};

router.post("/", async (request: Request, response: Response) => {
  const client: WhatsappClient = request.app.locals.whatsappClient;
  const body: PostBody = request.body;

  if (!body?.message?.media && !body?.message?.text)
    return response.status(400).end();

  try {
    if (body.message.text && !body.message.media) {
      await client.sendMessage(body.chat_id, body.message.text);
    }

    if (!body.message.text && body.message.media) {
      const media = new MessageMedia(
        body.message.media.type,
        body.message.media.data,
        body.message.media.name
      );

      await client.sendMessage(body.chat_id, media);
    }

    if (body.message.text && body.message.media) {
      const media = new MessageMedia(
        body.message.media.type,
        body.message.media.data,
        body.message.media.name
      );

      await client.sendMessage(body.chat_id, body.message.text, {
        media,
      });
    }
  } catch (err) {
    console.log(err);
  }

  response.status(201).end();
});

export default router;
