export function whenExpressListening() {
  console.log(
    `[Express] Servidor rodando na porta ${process.env.EXPRESS_PORT}`
  );
}
