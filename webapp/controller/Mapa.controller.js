sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.Mapa", {
      onInit: function () {
        // Resposta servidor:
        var obj =
          '{"data_chamado":"2023-08-30","descricao":"teste 20","observacao":null,"nome":"O Bifão","endereco":"R. São Jacó","cidade":"Novo Hamburgo","bairro":"Centro","estado":"RS"},{"data_chamado":"2023-08-30","descricao":"teste 200","observacao":"Teste Observacao","nome":"Xis da 15","endereco":"Av Padre Claret","cidade":"Esteio","bairro":null,"estado":"RS"},{"data_chamado":"2023-08-29","descricao":"teste 2000","observacao":null,"nome":"Bourbon Shopping São Leopoldo","endereco":"R. Primeiro de Março","cidade":"São Leopoldo","bairro":"Centro","estado":"RS"},{"data_chamado":"2023-11-24","descricao":"Visita Fulano","observacao":"Analisar Erro setor compras","nome":"Inbetta","endereco":null,"cidade":"Esteio","bairro":"Novo Esteio","estado":"RS"}';
        // Conversão
        const arrobj = JSON.parse("[" + obj + "]");
        // Filtra/concatena campos de endereco
        var waypoints = arrobj.map((item) => {
          return {
            name: [
              item.nome,
              item.endereco,
              item.bairro,
              item.cidade,
              item.estado,
            ].join(","),
          };
        });
        obj = JSON.stringify(waypoints);
        // Template rota
        const rota = [
          {
            name: "",
            start: "Novo Hamburgo, RS",
            end: "São Leopoldo, RS",
            stops: waypoints,
          },
        ];
        // Cria Model
        var oModel = new sap.ui.model.json.JSONModel({
          places: rota,
        });
        // Seta model na view
        this.getView().setModel(oModel);
        // Gera context e binda no mapa presente na view
        var oContext = oModel.getContext("/places/0/");
        this.byId("gmap").setBindingContext(oContext);
      },
    });
  }
);
