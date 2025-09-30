import { type Client } from "whatsapp-web.js";

export type WhatsappClient = Client;

export type WhatsappEvent = {
  name: string;
  once: boolean;
  run: (client: WhatsappClient, ...args: any[]) => void;
};
