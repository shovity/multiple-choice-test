document.addEventListener('DOMContentLoaded', () => {
  const socket = io()


  // listener
  let menuOpen = true
  btnMenu.addEventListener('click', () => {
    if (menuOpen) {
      navbar.className = ''
      sidebar.className = ''
    } else {
      navbar.className = 'open'
      sidebar.className = 'open'
    }
    menuOpen = !menuOpen
  })
})
