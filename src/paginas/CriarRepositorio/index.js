import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import estilos from "./estilos";
import { criarRepositoriosDoUsuario } from "../../servicos/requisicoes/repositorios";

export default function CriarRepositorio({ route, navigation }) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");

  async function criar() {
      console.log(route.params.id)
    const resultado = await criarRepositoriosDoUsuario(
      route.params.id,
      nome,
      data
    );

    if (resultado === "sucesso") {
      Alert.alert("Repositório criado!");
      navigation.goBack();
    } else {
      Alert.alert("Erro ao criar o repositório");
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Nome do repositório"
        placeholderTextColor={'gray'}
        autoCapitalize="none"
        style={estilos.entrada}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Data de criação"
        placeholderTextColor={'gray'}
        autoCapitalize="none"
        style={estilos.entrada}
        value={data}
        onChangeText={setData}
      />
      <TouchableOpacity style={estilos.botao} onPress={criar}>
        <Text style={estilos.textoBotao}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}
