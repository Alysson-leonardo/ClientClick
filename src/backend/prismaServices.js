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
export async function allProviders(filters) {
  console.log(filters, "prisma service");
  if (
    (filters.cidade === "todas" && filters.profissao === "todas") ||
    (filters.cidade === "todas" && filters.profissao === "") ||
    (filters.cidade === "" && filters.profissao === "todas")
  ) {
    return await prisma.prestador.findMany({
      select: {
        id_prestador: true,
        nome_prestador: true,
        profissao_prestador: true,
        cidade_prestador: true,
      },
      take: 10,
    });
  }
  return await prisma.prestador.findMany({
    where: {
      ...(filters.cidade && {
        cidade_prestador: { contains: filters.cidade },
      }),
      ...(filters.profissao && {
        profissao_prestador: {
          contains: filters.profissao,
        },
      }),
    },
    select: {
      id_prestador: true,
      nome_prestador: true,
      profissao_prestador: true,
      cidade_prestador: true,
    },
    take: 10,
  });
}
