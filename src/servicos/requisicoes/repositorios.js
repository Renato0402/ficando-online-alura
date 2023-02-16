import api from "../api";

export async function pegarRepositoriosDoUsuario(id) {
  try {
    const resultado = await api.get(`/repos?postId=${id}`);
    return resultado.data;
  } catch (error) {
    return [];
  }
}

export async function salvarRepositoriosDoUsuario(postId, nome, data, id) {
  try {
    await api.put(`/repos/${id}`, {
      name: nome,
      data: data,
      postId: postId,
      id: id,
    });
    return "sucesso";
  } catch (error) {
    return "erro";
  }
}

export async function pegarRepositorioDoUsuarioPorNome(postId, nome) {
  try {
    const resultado = await api.get(`/repos?postId=${postId}&name=${nome}`);
    return resultado.data;
  } catch (error) {
    return {};
  }
}
