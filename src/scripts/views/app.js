document.addEventListener('DOMContentLoaded', () => {
  // Ambil elemen ul untuk menampilkan data
  const tukangList = document.getElementById('tukang-list');

  // Panggil API
  fetch('https://capstone-builderco.vercel.app/api/v1/tukang')
      .then(response => response.json())
      .then(data => {
          // Loop melalui data dan tambahkan ke dalam elemen ul
          data.forEach(jasa => {
              const listItem = document.createElement('li');
              listItem.innerHTML = `
                  <strong>Jasa Pelayanan:</strong> ${jasa.jasa_pelayanan}<br>
                  <strong>URL Gambar:</strong> ${jasa.url_gambar}<br>
                  <strong>Rating:</strong> ${jasa.rating}<br>
                  <strong>Kota:</strong> ${jasa.kota}<br>
                  <strong>Alamat:</strong> ${jasa.alamat}<br>
                  <strong>Deskripsi:</strong> ${jasa.deskripsi}
              `;
              tukangList.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});
