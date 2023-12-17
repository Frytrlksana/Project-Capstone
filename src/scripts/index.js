import '../styles/style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Ambil elemen ul untuk menampilkan data
  const tukangList = document.getElementById('tukang-list');

  fetch('https://capstone-builderco.vercel.app/api/v1/tukang')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Received data:', data.data);

      // Periksa apakah data adalah array yang dapat diiterasi
      if (!Array.isArray(data.data)) {
        throw new Error('Data is not an array');
      }

      // Hapus semua elemen child sebelum menambahkan yang baru
      tukangList.innerHTML = '';

      data.data.forEach(jasa => {
        const listItem = document.createElement('div');
        listItem.classList.add('col-md-4', 'custom-card'); // Bootstrap class for 3 columns

        // Add a container for the card
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card', 'mb-3');

        cardContainer.innerHTML = `
          <div class="position-relative">
            <div class="overlay"></div>
        
            <img src="${jasa.urlgambar}" class="card-img-top" alt="url" style="border-radius: 8px;">
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h5 class="card-title fw-bold text-light" style="font-family: 'Lily Script One', cursive; font-size: 20px;">${jasa.jasa_pelayanan}</h5>
              <div class="position-absolute bottom-100 end-100 m-4">
                <span class="badge bg-warning fs-5">${jasa.rating}</span>
              </div>
                <p class="card-text"> ${jasa.kota}</p>
                <strong></strong> ${jasa.alamat}<br>
            </div>
          </div>
          <div class="card-body">
            
            <div class="description-container">

              <p class="card-text description text-justify style="font-family : sans-serif;">${jasa.deskripsi.substring(0, 200  )}...</p>
              <button class="btn-detail btn-secondary btn-description" data-toggle="modal" data-target="#descriptionModal-${jasa.id}">Selengkapnya</button>
            </div>
            <a href="https://wa.me/6282145604163" class="btn-booking btn-success">Booking via WhatsApp</a>
          </div>
        `;

        listItem.appendChild(cardContainer);
        tukangList.appendChild(listItem);

        // Add a modal for the detailed description
        const descriptionModal = document.createElement('div');
        descriptionModal.classList.add('modal', 'fade');
        descriptionModal.id = `descriptionModal-${jasa.id}`;
        descriptionModal.tabIndex = '-1';
        descriptionModal.setAttribute('role', 'dialog');
        descriptionModal.setAttribute('aria-labelledby', `descriptionModalLabel-${jasa.id}`);
        descriptionModal.setAttribute('aria-hidden', 'true');

        descriptionModal.innerHTML = `
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="descriptionModalLabel-${jasa.id}">${jasa.jasa_pelayanan} - Deskripsi Lengkap</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>${jasa.deskripsi}</p>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(descriptionModal);

        // Add event listener to the "Selengkapnya" button
        const selengkapnyaButton = listItem.querySelector('.btn-detail');
        selengkapnyaButton.addEventListener('click', () => {
          const modal = new bootstrap.Modal(document.getElementById(`descriptionModal-${jasa.id}`));
          modal.show();
        });
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
