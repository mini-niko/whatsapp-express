const qrcode = require("qrcode-terminal");

const config = {
  name: "ready",
  once: true,
  run: () => {
    console.log("[Wpp Web] O Whatsapp está pronto para ser utilizado.");
  },
};

export default config;
