import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import estilos from "./estilos";
import {
  pegarRepositoriosDoUsuario,
  pegarRepositorioDoUsuarioPorNome,
} from "../../servicos/requisicoes/repositorios";
import { useIsFocused } from "@react-navigation/native";

export default function Repositorios({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const estaNaTela = useIsFocused();
  const [nomeRepo, setNomeRepo] = useState("");

  useEffect(() => {
    async function getRepos() {
      const resultado = await pegarRepositoriosDoUsuario(
        route?.params.nome,
        nomeRepo
      );
      
      setRepo(resultado);
    }

    getRepos();
  }, [estaNaTela]);

  async function buscarRepositorioPorNome() {
    const resultado = await pegarRepositorioDoUsuarioPorNome(
      route?.params.nome,
      nomeRepo
    );
    setRepo(resultado);
    setNomeRepo("");
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Busque por um repositório"
        placeholderTextColor={"gray"}
        autoCapitalize="none"
        style={estilos.entrada}
        value={nomeRepo}
        onChangeText={(texto) => setNomeRepo(texto)}
      />

      <TouchableOpacity
        onPress={buscarRepositorioPorNome}
        style={estilos.botao}
      >
        <Text style={estilos.textoBotao}>Buscar</Text>
      </TouchableOpacity>
      <Text style={estilos.repositoriosTexto}>
        {repo.length} repositórios criados
      </Text>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() =>
          navigation.navigate("CriarRepositorio", { id: route.params.id })
        }
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>

      <FlatList
        data={repo}
        style={{ width: "100%" }}
        keyExtractor={(repo) => repo.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.repositorio}
            onPress={() => {
              navigation.navigate("InfoRepositorio", {
                item,
              });
            }}
          >
            <Text style={estilos.repositorioNome}>{item.name}</Text>
            <Text style={estilos.repositorioData}>
              Atualizado em {item.data}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
