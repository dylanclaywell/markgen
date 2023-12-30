document.addEventListener('click', (event) => {
  if (event.target instanceof HTMLButtonElement) {
    const button = event.target
    const id = button.getAttribute('data-content-id')

    const content = document.getElementById(id)

    if (content.classList.contains('hidden')) {
      const height = content.scrollHeight
      content.classList.remove('hidden')
      content.style.height = `${height}px`
      button.classList.add('open')
      content.ariaHidden = undefined
    } else {
      content.classList.add('hidden')
      button.classList.remove('open')
      content.style.height = '0px'
      content.ariaHidden = true
    }
  }
})
