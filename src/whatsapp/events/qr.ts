import { WhatsappClient } from "../type";

const qrcode = require("qrcode-terminal");

const config = {
  name: "qr",
  once: false,
  run: (client: WhatsappClient, qr: string) => {
    console.log("[Wpp Web] QR Code gerado!");
    console.log("[Wpp Web] Escaneio o QR Code para conectar seu Whatsapp.\n");

    qrcode.generate(qr, { small: true });
  },
};

export default config;
