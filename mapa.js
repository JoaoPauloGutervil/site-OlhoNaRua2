// ===========================
//  MAPA DE OCORRÊNCIAS (COM IMAGEM)
// ===========================

const mapaElement = document.getElementById("mapa");

if (mapaElement) {

  // Iniciar mapa
  const mapa = L.map("mapa").setView([-23.76224048251055, -53.31163613659295], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(mapa);

  // Carregar ocorrências do localStorage
  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];

  ocorrencias.forEach(o => {
    if (o.lat && o.lng) {
      const marcador = L.marker([o.lat, o.lng]).addTo(mapa);

      // Conteúdo base do popup
      let popupHTML = `
        <strong>${o.tipo}</strong><br>
        ${o.descricao}<br>
        <em>${o.local}</em><br>
      `;

      // Se existe imagem, exibir dentro do popup
      if (o.imagemBase64) {
        popupHTML += `
          <br>
          <img src="${o.imagemBase64}" alt="Imagem da ocorrência" width="180" style="border-radius: 6px; margin-top: 6px;">
        `;
      }

      marcador.bindPopup(popupHTML);
    }
  });
}
