// ===================================
//  VALIDAR FORMULÁRIO DE OCORRÊNCIA + SALVAR NO MAPA (COM IMAGEM)
// ===================================
const formOcorrencia = document.getElementById("formOcorrencia");

if (formOcorrencia) {
  formOcorrencia.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll(".form-error").forEach(el => (el.textContent = ""));
    const success = document.getElementById("form-success");
    if (success) success.textContent = "";

    const tipo = document.getElementById("tipo");
    const descricao = document.getElementById("descricao");
    const localizacao = document.getElementById("localizacao");
    const contato = document.getElementById("contato");
    const fotoInput = document.getElementById("foto");

    let firstInvalid = null;

    // Validações
    if (tipo.value === "") {
      document.getElementById("erro-tipo").textContent = "Selecione um tipo de problema.";
      firstInvalid = firstInvalid || tipo;
    }

    if (descricao.value.trim().length < 10) {
      document.getElementById("erro-descricao").textContent = "A descrição deve ter ao menos 10 caracteres.";
      firstInvalid = firstInvalid || descricao;
    }

    if (localizacao.value.trim().length < 5) {
      document.getElementById("erro-localizacao").textContent = "Informe uma localização válida.";
      firstInvalid = firstInvalid || localizacao;
    }

    if (contato.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato.value)) {
      document.getElementById("erro-contato").textContent = "E-mail inválido.";
      firstInvalid = firstInvalid || contato;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Verificar se geolocalização foi usada
    if (!lat || !lng) {
      alert("⚠️ Clique em 'Usar minha localização' antes de registrar.");
      return;
    }

    // Salvar IMAGEM (se foi enviada)
    const salvarOcorrencia = (imagemBase64 = null) => {
      const novaOcorrencia = {
        tipo: tipo.value,
        descricao: descricao.value,
        local: localizacao.value,
        lat: lat,
        lng: lng,
        imagemBase64: imagemBase64   // <-- AGORA COM IMAGEM
      };

      // Salvar no localStorage
      const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
      ocorrencias.push(novaOcorrencia);
      localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias));

      if (success) {
        success.textContent = "✅ Ocorrência registrada e enviada para o mapa!";
        success.classList.add("form-success");
      }

      formOcorrencia.reset();
      lat = null;
      lng = null;
    };

    // Se tem arquivo → converter para Base64
    if (fotoInput.files.length > 0) {
      const arquivo = fotoInput.files[0];
      const reader = new FileReader();

      reader.onload = () => salvarOcorrencia(reader.result);
      reader.readAsDataURL(arquivo);
    } 
    // Se não tem imagem → salvar normal
    else {
      salvarOcorrencia(null);
    }

  });
}
