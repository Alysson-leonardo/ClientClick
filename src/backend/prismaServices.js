import prisma from "../../prisma/indice.js";
// login e register
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
// redenrização dos prestadores
export async function allProviders(qtde) {
  return await prisma.prestador.findMany({
    select: {
      id_prestador: true,
      nome_prestador: true,
      profissao_prestador: true,
      cidade_prestador: true,
    },
    take: qtde,
  });
}
