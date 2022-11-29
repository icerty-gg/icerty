export const getPort = () => {
  return process.env.PORT ? parseInt(process.env.PORT) : 3001
}
