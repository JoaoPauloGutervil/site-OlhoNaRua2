// ===================================
//  MENU RESPONSIVO E ACESSÍVEL
// ===================================
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-controls", "menu");

  const toggleMenu = () => {
    const aberto = menu.classList.toggle("ativo");
    menu.style.display = aberto ? "flex" : "none";
    menuBtn.setAttribute("aria-expanded", aberto ? "true" : "false");

    if (aberto) {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  };

  menuBtn.addEventListener("click", toggleMenu);

  menuBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("ativo")) {
      menu.classList.remove("ativo");
      menu.style.display = "none";
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.focus();
    }
  });
}



// ===================================
//  ROLAGEM SUAVE ENTRE SEÇÕES
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      target.focus({ preventScroll: true });
    }
  });
});



// ===================================
//  PEGAR LOCALIZAÇÃO (GEOLOCALIZAÇÃO)
// ===================================
let lat = null;
let lng = null;

const btnLocalizacao = document.getElementById("btnLocalizacao");

if (btnLocalizacao) {
  btnLocalizacao.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;

        const campoLocalizacao = document.getElementById("localizacao");
        campoLocalizacao.value = `Lat: ${lat.toFixed(5)} | Lng: ${lng.toFixed(5)}`;
      },
      () => {
        alert("⚠️ Não foi possível obter sua localização.");
      }
    );
  });
}



// ===================================
//  VALIDAR FORMULÁRIO DE OCORRÊNCIA + SALVAR NO MAPA
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

    // Verificar se a geolocalização foi usada
    if (!lat || !lng) {
      alert("⚠️ Clique em 'Usar minha localização' antes de registrar.");
      return;
    }

    // Criar objeto da ocorrência
    const novaOcorrencia = {
      tipo: tipo.value,
      descricao: descricao.value,
      local: localizacao.value,
      lat: lat,
      lng: lng
    };

    // Salvar no localStorage
    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
    ocorrencias.push(novaOcorrencia);
    localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias));

    if (success) {
      success.textContent = "✅ Ocorrência registrada e enviada para o mapa!";
      success.classList.add("form-success");
    }

    // Limpar
    formOcorrencia.reset();
    lat = null;
    lng = null;
  });
}



// ===================================
//  VALIDAR LOGIN
// ===================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const erro = document.getElementById("loginError");

    erro.textContent = "";
    erro.classList.remove("form-success");
    erro.classList.add("form-error");

    const toggleSenha = document.getElementById("toggleSenha");
    if (toggleSenha) {
      toggleSenha.onclick = () => {
        senha.type = senha.type === "password" ? "text" : "password";
      };
    }

    if (!email.value || !senha.value) {
      erro.textContent = "Preencha todos os campos para continuar.";
      email.focus();
      return;
    }

    if (!email.value.includes("@")) {
      erro.textContent = "Insira um e-mail válido.";
      email.focus();
      return;
    }

    erro.textContent = "Login realizado com sucesso!";
    erro.classList.remove("form-error");
    erro.classList.add("form-success");

    loginForm.reset();
  });
}



// ===================================
//  ACCORDION (FAQ)
// ===================================
const accordionBtns = document.querySelectorAll(".accordion-btn");

accordionBtns.forEach(btn => {
  btn.setAttribute("aria-expanded", "false");

  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const aberto = content.style.display === "block";

    accordionBtns.forEach(b => {
      b.setAttribute("aria-expanded", "false");
      b.nextElementSibling.style.display = "none";
    });

    btn.setAttribute("aria-expanded", aberto ? "false" : "true");
    content.style.display = aberto ? "none" : "block";
  });
});
