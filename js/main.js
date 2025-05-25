document.addEventListener("DOMContentLoaded", () => {
const basePath = (() => {
  const path = location.pathname;
  const isGitHubPages = location.hostname === "juanzarta.github.io";
  const repoName = "/Fudesmud/";

  if (isGitHubPages) {
    if (path.includes("/page/lineas/")) return `${repoName}`;
    if (path.includes("/page/")) return `${repoName}`;
    return `${repoName}`;
  } else {
    if (path.includes("/page/lineas/")) return "../../";
    if (path.includes("/page/")) return "../";
    return "./";
  }
})();


  // Cargar navbar
  fetch(`${basePath}page/navbar.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;
      cargarSubmenuLineas(basePath);
    })
    .catch((err) => console.error("Error al cargar navbar:", err));

  // Cargar contacto
  fetch(`${basePath}page/contacto.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("contacto-placeholder").innerHTML = data;
    });

  // Cargar tarjetas de servicios si aplica
  cargarTarjetas(basePath);

  // Cargar carrusel dinámico si aplica
  cargarCarrusel(basePath);
});

// =====================
// Cargar tarjetas desde data.json
// =====================
function cargarTarjetas(basePath) {
  const container = document.getElementById("tarjetas-container");
  if (!container) return;

  fetch(`${basePath}data/data.json`)
    .then((res) => res.json())
    .then((data) => {
      data.tarjetas.forEach((item) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        const slug = item.titulo.toLowerCase().replace(/\s+/g, "-");

        tarjeta.innerHTML = `
          <h3>${item.titulo}</h3>
          <p>${item.frase}</p>
          <img src="${item.imagen}" alt="${item.titulo}">
          <a href="${basePath}page/lineas/lineas.html?producto=${slug}">
            <button>Ver más</button>
          </a>
        `;

        container.appendChild(tarjeta);
      });
    })
    .catch((err) => console.error("Error al cargar las tarjetas:", err));
}

// =====================
// Cargar submenú "Líneas Productivas" desde JSON
// =====================
function cargarSubmenuLineas(basePath) {
  const submenu = document.getElementById("submenu-lineas");
  if (!submenu) return;

  fetch(`${basePath}data/data.json`)
    .then((res) => res.json())
    .then((data) => {
      data.tarjetas.forEach((item) => {
        const li = document.createElement("li");
        const slug = item.titulo.toLowerCase().replace(/\s+/g, "-");
        li.innerHTML = `<a href="${basePath}page/lineas/lineas.html?producto=${slug}">${item.titulo}</a>`;
        submenu.appendChild(li);
      });
    })
    .catch((err) => console.error("Error cargando submenú:", err));
}

// =====================
// Cargar imágenes del carrusel desde JSON
// =====================
function cargarCarrusel(basePath) {
  const contenedor = document.getElementById("carrusel-container");
  if (!contenedor) return;

  fetch(`${basePath}data/data.json`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.inicio) return;

      data.inicio.forEach((item, index) => {
        const img = document.createElement("img");
        img.src = `${basePath}${item.carrusel}`;
        img.alt = `Imagen carrusel ${index + 1}`;
        if (index === 0) img.classList.add("active");
        contenedor.appendChild(img);
      });

      iniciarCarrusel();
    })
    .catch((err) => console.error("Error cargando imágenes del carrusel:", err));
}

// =====================
// Activar carrusel rotativo
// =====================
function iniciarCarrusel() {
  const carruselImgs = document.querySelectorAll(".carrusel img");
  if (carruselImgs.length === 0) return;

  let index = 0;

  function rotarImagenes() {
    carruselImgs.forEach((img) => img.classList.remove("active"));
    carruselImgs[index].classList.add("active");
    index = (index + 1) % carruselImgs.length;
  }

  rotarImagenes();
  setInterval(rotarImagenes, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-info");
  const titulo = document.getElementById("modal-titulo");
  const imagen = document.getElementById("modal-imagen");
  const texto = document.getElementById("modal-texto");

  const contenidoModales = {
    proyectos: {
      titulo: "Nuestros Proyectos",
      imagen: "assets/img/nosotros/proyectos.jpg",
      texto: "Descubre las iniciativas que estamos llevando a cabo para mejorar las condiciones de vida de nuestras comunidades rurales."
    },
    causa: {
      titulo: "Únete a FUDESMU",
      imagen: "assets/img/nosotros/liderazgo.jpg",
      texto: "Forma parte del cambio social apoyando nuestros programas de impacto sostenible y desarrollo comunitario."
    }
  };

  document.querySelectorAll("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tipo = btn.getAttribute("data-modal");
      if (!contenidoModales[tipo]) return;

      const { titulo: t, imagen: i, texto: tx } = contenidoModales[tipo];
      titulo.textContent = t;
      imagen.src = i;
      texto.textContent = tx;

      modal.style.display = "flex";
      modal.classList.add("modalFadeIn");
    });
  });

  // Cerrar modal
  document.querySelector(".modal-close").addEventListener("click", () => {
    cerrarModal();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });

  function cerrarModal() {
    modal.classList.remove("modalFadeIn");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300); // coincide con duración de animación si tienes una
  }
});
