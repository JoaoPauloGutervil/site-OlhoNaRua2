// ===========================
//  MAPA DE OCORRÊNCIAS
// ===========================

const mapaElement = document.getElementById("mapa");

if (mapaElement) {
  const mapa = L.map("mapa").setView([-23.76224048251055, -53.31163613659295], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(mapa);

  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];

  ocorrencias.forEach(o => {
    if (o.lat && o.lng) {
      const marcador = L.marker([o.lat, o.lng]).addTo(mapa);

      marcador.bindPopup(`
        <strong>${o.tipo}</strong><br>
        ${o.descricao}<br>
        <em>${o.local}</em>
      `);
    }
  });
}
