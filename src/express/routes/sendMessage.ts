import { Request, Response, Router, text } from "express";
import { WhatsappClient } from "../../whatsapp/type";
import { MessageMedia } from "whatsapp-web.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

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

router.post(
  "/",
  upload.single("attachment"),
  async (request: Request, response: Response) => {
    const client: WhatsappClient = request.app.locals.whatsappClient;

    let body;
    try {
      body = JSON.parse(request.body.payload);
    } catch (err) {
      return response.status(400).json({ error: "Payload inválido" });
    }

    if (!body?.body && !request.file) {
      return response
        .status(400)
        .json({ error: "Nenhuma mensagem ou arquivo enviado" });
    }

    try {
      if (body.body && !request.file) {
        console.log("Heya");
        await client.sendMessage(body.chat_id, body.body);
      }

      if (!body.body && request.file) {
        const media = new MessageMedia(
          request.file.mimetype,
          request.file.buffer.toString("base64"),
          request.file.originalname
        );

        await client.sendMessage(body.chat_id, media);
      }

      if (body.body && request.file) {
        const media = new MessageMedia(
          request.file.mimetype,
          request.file.buffer.toString("base64"),
          request.file.originalname
        );

        await client.sendMessage(body.chat_id, body.body, { media });
      }

      response.status(201).json({ status: "ok" });
    } catch (err) {
      console.error(err);
      response.status(500).json({ error: "Erro ao enviar mensagem" });
    }
  }
);

export default router;
