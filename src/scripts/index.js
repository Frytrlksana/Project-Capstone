import 'regenerator-runtime';
// import '../styles/beranda.css';
// import '../styles/kelolaSampah.css';
// import '../styles/layanan.css';
// import '../styles/tentangKami.css';
// import '../styles/buktiTransaksiTukar.css';
// import '../styles/buktiTransaksiJual.css';
// import '../styles/loginAdmin.css';
// import '../styles/admin.css';
import App from './views/app';

const app = new App({
  button: document.querySelector('.hamburger'),
  drawer: document.querySelector('nav'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  const urlSkip = window.location.hash;
  if (urlSkip === '#container-form-sell' || urlSkip === '#container-form-exchange') {
    return;
  }
  window.scrollTo(0, 0);
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
