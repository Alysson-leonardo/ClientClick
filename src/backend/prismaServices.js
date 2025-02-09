import prisma from "../../prisma/indice.js";
// login e register
export async function CreateUserClient(data) {
  return await prisma.cliente.create({ data });
}
export async function CreateUserProvider(data) {
  return await prisma.prestador.create({ data });
}
export async function SearchUserClient(coluna, valor) {
  return await prisma.cliente.findUnique({
    where: { [coluna]: valor },
  });
}
export async function SearchUserProvider(coluna, valor) {
  return await prisma.prestador.findUnique({
    where: { [coluna]: valor },
  });
}
// redenrização dos prestadores
export async function allProviders(filters) {
  console.log(
    typeof filters.profissao,
    typeof filters.cidade,
    "prisma service"
  );

  if (filters.cidade == "" && filters.profissao == "") {
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
