const photoElements = document.querySelectorAll("img.thumb");
const accessKey = '2Z4bUGqWCWeJYTSntahx2Te8CXz2pQVc-b5IgT1asuI';
const query = 'travel';
const orientation = 'landscape';
const count = 12;

async function getRandomPhotos() {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&client_id=${accessKey}&orientation=${orientation}`);

    if (!response.ok) {
      throw new Error("Não conseguimos encontrar fotos.");
    }
    const data = await response.json();
    const photos = data.results;

    // Garante que o número de fotos obtidas não ultrapasse o número de elementos na página
    const numPhotos = Math.min(photos.length, photoElements.length);

    for (let i = 0; i < numPhotos; i++) {
      photoElements[i].src = photos[i].urls.regular;
      photoElements[i].alt = photos[i].alt_description || "Foto de viagem"; // Adicionando alt text para acessibilidade
    }

  } catch(error) {
    console.error("Erro ao buscar fotos:", error);
  }
}

// Chama a função para que ela seja executada
getRandomPhotos();