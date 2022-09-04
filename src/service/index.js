class Service {
  fetchRndCatImg() {
    return fetch("https://api.thecatapi.com/v1/images/search");
  }
}

export default Service;
