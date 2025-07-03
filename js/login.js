function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  const originalPrices = document.querySelectorAll('.original-price');
  const prices = document.querySelectorAll('.price');
  const discountedPrices = document.querySelectorAll('.discounted-price');
  const priceContainers = document.querySelectorAll('.price-container');
  const categoryname = document.querySelectorAll('.category-name');
  const footer = document.querySelectorAll('.footer-bottom');
  const footerText = document.querySelectorAll('.footer-text');
  const footerLinks = document.querySelectorAll('.footer-link');
  const footerIcons = document.querySelectorAll('.footer-icon');
  const footerLogo = document.querySelector('.footer-logo');
  const headline = document.querySelector('.testimonial-heading1');


  if (document.body.classList.contains('dark-mode')) {
    originalPrices.forEach(element => element.style.color = 'white');
    prices.forEach(element => element.style.color = 'white');
    discountedPrices.forEach(element => element.style.color = 'white');
    priceContainers.forEach(element => element.style.color = 'white');
    categoryname.forEach(element => element.style.color = 'white');
    footer.forEach(element => element.style.backgroundColor = 'white');
    footer.forEach(element => element.style.color = 'white');
    footerText.forEach(element => element.style.color = 'black');
    headline.forEach(element => element.style.color = 'white');
  } else {
    originalPrices.forEach(element => element.style.color = '');
    prices.forEach(element => element.style.color = '');
    discountedPrices.forEach(element => element.style.color = '');
    priceContainers.forEach(element => element.style.color = '');
    categoryname.forEach(element => element.style.color = '');
    footer.forEach(element => element.style.backgroundColor = '');
    footer.forEach(element => element.style.color = '');
    headline.forEach(element => element.style.color = '');
  }
}

function closeBox() {
  document.getElementById("myBox").style.display = "none";
}

function logoutbtn() {
  window.location.href = "index.html";
}