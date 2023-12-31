window.addEventListener('hashchange', () => {
  const anchors = document.querySelectorAll('.sidebar a')
  anchors.forEach((anchor) => {
    if (anchor.getAttribute('data-hash') === window.location.hash) {
      anchor.classList.add('active')
      anchor.parentElement.classList.add('active')
      return
    }

    anchor.parentElement.classList.remove('active')
    anchor.classList.remove('active')
  })
})
