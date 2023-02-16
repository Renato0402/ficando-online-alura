import api from "../api";

export async function pegarRepositoriosDoUsuario(nome) {
  try {
    const resultado = await api.get(`/users/${nome}/repos`);
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

export async function pegarRepositorioDoUsuarioPorNome(nome,repo_nome) {
  try {
    const resultado = await api.get(`/repos/${nome}/${repo_nome}`);
    return resultado.data;
  } catch (error) {
    return {};
  }
}

export async function criarRepositoriosDoUsuario(postId, nome, data) {
  try {
    await api.post(`/repos/`, {
      name: nome,
      data: data,
      postId: postId,
    });
    return "sucesso";
  } catch (error) {
    return "erro";
  }
}

export async function deletarRepositorioDoUsuario(id) {
  try {
    await api.delete(`/repos/${id}`);
    return "sucesso";
  } catch (error) {
    return "erro";
  }
}