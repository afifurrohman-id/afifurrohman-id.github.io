async function getFirebaseDatabase(databaseName) {
  const { getDatabase, get, ref } = await import(
    'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js'
  )

  const { initializeApp } = await import(
    'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
  )

  const getClientHostname = window.location.hostname

  const urlApi =
    getClientHostname === 'afifurrohman-id.github.io'
      ? 'https://firebase-afif.deno.dev'
      : '/__/firebase/init.json'

  const responseApi = await fetch(urlApi)
  const dataApi = await responseApi.json()
  const firebaseConfig = await dataApi

  const app = initializeApp(firebaseConfig)
  const database = await getDatabase(app)
  const projectRef = ref(await database, databaseName)
  const responseDB = await get(projectRef)
  const data = await responseDB.val()

  return data
}

async function projectView() {
  const wrapper = document.getElementById('list-project')
  const loading = wrapper.querySelector('.loading')

  const iconLink = /*html*/ `
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='currentColor' viewBox='0 0 16 16'>
      <path fillRule='evenodd' d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z' />
      <path fillRule='evenodd' d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z' />
    </svg>`

  const dataSnap = await getFirebaseDatabase('projects')

  loading.remove()

  let content = ''
  dataSnap.forEach((project) => {
    content +=
      /*html*/
      `<div class='project-card'>
        <img class='project-card-thumb' loading='lazy' src=${project.thumbs}   alt=${project.title} title=${project.title}>
        <h1 class='project-card-title'>${project.title}</h1>
        <p class='project-desc'>${project.description}</p>
        <p class="project-date">${project.date}</p>
        <a class="project-view-more-btn" href=${project.url} role='button'>View More ${iconLink}</a>
      </div>
      `
  })
  wrapper.insertAdjacentHTML('afterbegin', content)
}

window.addEventListener('scroll', () => {
  const backTopbtn = document.getElementById('go-top-btn')
  if (window.scrollY >= 300) {
    backTopbtn.style.display = 'flex'
    backTopbtn.addEventListener('click', () => window.scrollTo({ top: 0 }))
  } else backTopbtn.style.display = 'none'
})

document.getElementById('list-project') && await projectView()
