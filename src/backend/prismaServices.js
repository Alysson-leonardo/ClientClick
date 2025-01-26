import prisma from "../../prisma/indice.js";

export async function CreateUserClient(data) {
  return await prisma.cliente.create({ data });
}
export async function CreateUserProvider(data) {
  return await prisma.prestador.create({ data });
}
export async function SearchUserClient(email) {
  return await prisma.cliente.findUnique({ where: { email: email } });
}
export async function SearchUserProvider(email) {
  return await prisma.prestador.findUnique({ where: { email: email } });
}
