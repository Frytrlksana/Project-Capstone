/* eslint-disable no-console */
const TentangKami = {
  async render() {
    return `
            <h2>Test Tentang Kami</h2>
          `;
  },

  async afterRender() {
    console.log('tentang kami');
  },
};

export default TentangKami;
