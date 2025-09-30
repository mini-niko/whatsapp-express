import path from "path";
import fs from "fs";

import { LocalAuth, Client, type Client as WppClient } from "whatsapp-web.js";
import { WhatsappEvent } from "./type";

const client: WppClient = new Client({
  authStrategy: new LocalAuth(),
});

async function setup() {
  console.log("\n[Wpp Web] Registrando eventos...\n");

  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const fileImport = await import(filePath);
    const event = fileImport.default as WhatsappEvent;

    if (!event?.name || !event?.run || typeof event?.once != "boolean") {
      console.warn("\x1b[33m", `[Wpp Web] 🟡 Evento inválido em ${file}`);
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.run(client, ...args));
      console.warn(
        "\x1b[32m",
        `[Wpp Web] 🟨 Evento ONCE registrado: ${event.name}`
      );
    } else {
      client.on(event.name, (...args) => event.run(client, ...args));
      console.warn(
        "\x1b[32m",
        `[Wpp Web] 🟩 Evento ON registrado: ${event.name}`
      );
    }
  }

  console.log("\x1b[0m", `\n[Wpp Web] Eventos Registrados.`);
  console.log(`[Wpp Web] Iniciando cliente...`);

  client.initialize();

  console.log(`[Wpp Web] Cliente inicializado.\n`);

  return client;
}

const wppModule = {
  setup,
};

export default wppModule;
