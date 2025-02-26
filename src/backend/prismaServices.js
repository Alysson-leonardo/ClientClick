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
// crud pedidos
export async function allPedidos(id_cliente) {
  return await prisma.pedido.findMany({
    where: { ...(id_cliente && { clienteId: { equals: id_cliente } }) },
    select: {
      id_pedido: true,
      nome_pedido: true,
      valor_pedido: true,
      clienteId: true,
      cliente: {
        select: {
          nome: true,
          cidade: true,
        },
      },
    },

    take: 10,
  });
}
export async function createService(props) {
  return await prisma.pedido.create({
    data: {
      nome_pedido: props.nome_pedido,
      valor_pedido: props.valor_pedido,
      cliente: { connect: { id_cliente: props.clienteId } },
    },
  });
}
export async function createChat(props) {
  return await prisma.conversa.create({
    data: {
      id_conversa: props.idConversa,
      cliente: { connect: { id_cliente: props.id_cliente } },
      prestador: { connect: { id_prestador: props.id_prestador } },
    },
  });
}
export async function getChat(props) {
  console.log(props.id);
  return await prisma.conversa.findMany({
    where: {
      OR: [
        { id_cliente_conversa: props.id },
        { id_prestador_conversa: props.id },
      ],
    },
    include: {
      cliente: {
        select: {
          nome: true,
        },
      },
      prestador: {
        select: {
          nome_prestador: true,
        },
      },
    },
  });
}
