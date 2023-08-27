const retry = document.getElementById('retry');


retry.addEventListener('click', () => {
  if (form.style.display === 'none') {
    form.style.display = 'block';
    resultContainer.style.display = 'none';
  } else { // Otherwise, hide it
    form.style.display = 'none';
    resultContainer.style.display = 'block';
  }
})