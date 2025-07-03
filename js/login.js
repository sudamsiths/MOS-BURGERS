function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  
  const originalPrices = document.querySelectorAll('.original-price');
  const prices = document.querySelectorAll('.price');
  const discountedPrices = document.querySelectorAll('.discounted-price');
  const priceContainers = document.querySelectorAll('.price-container');
  
  if (document.body.classList.contains('dark-mode')) {
    originalPrices.forEach(element => element.style.color = 'white');
    prices.forEach(element => element.style.color = 'white');
    discountedPrices.forEach(element => element.style.color = 'white');
    priceContainers.forEach(element => element.style.color = 'white');
  } else {
    originalPrices.forEach(element => element.style.color = '');
    prices.forEach(element => element.style.color = '');
    discountedPrices.forEach(element => element.style.color = '');
    priceContainers.forEach(element => element.style.color = '');
  }
}

function closeBox() {
  document.getElementById("myBox").style.display = "none";
}

function logoutbtn() {
  window.location.href = "index.html";
}
