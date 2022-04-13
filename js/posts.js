import {PAGE_PARAMS, URL, API_KEY} from '/js/components/const.js';
import {createHeader, createFooter, createElem, createLoading} from '/js/components/components.js';


(() => {
  const PAGE_ID = PAGE_PARAMS.get('id'),
        API_MARVEL = `http://${URL}/${PAGE_ID}?${API_KEY}`,
        API_MARVELS = `http://${URL}/${PAGE_ID}/series?${API_KEY}`,
        IMG_PREFIX = "/portrait_uncanny"

  function createMain() {
    const main = createElem('main', {
            classList: ['main', 'main-post']
          }),
          sectionHero = createElem('section', {
            classList: ['hero']
          }, main),
          title = createElem('h1', {
            classList: ['title'],
            textContent: 'Marvel hero post'
          }, sectionHero)

    return {
      main,
      sectionHero
    }
  }

  function createPost(hero) {
    const item = createElem('div',{
            classList: ['post']
          }),
          wraperLeft = createElem('div', {
            classList: ['post__left'],
          }, item),
          wraperRight = createElem('div', {
            classList: ['post__right'],
          }, item),
          image = createElem('img', {
            classList: ['post__img'],
            src: hero.thumbnail.path + IMG_PREFIX + '.' + hero.thumbnail.extension,
            alt: 'Marvel'
          }, wraperLeft),
          title = createElem('h2', {
            classList: ['post__title'],
            textContent: hero.name
          }, wraperRight),
          desc = createElem('p', {
            classList: ['post__desc'],
            textContent: hero.description
          }, wraperRight),
          list = createElem('ul', {
            id: 'friends',
            classList: ['post__list'],
          }, wraperRight)

    return item
  }

  function createPostElem(friends, responseLink) {
    const listItem = createElem('li', {
              classList: ['post__item'],
            }),
            heroFriendsItem = createElem('a', {
              classList: ['post__heroFriends'],
              textContent: friends.name,
              href: `posts.html?id=${responseLink.data.results[0].id}`
            }, listItem)

    return listItem
  }

  async function loadMarvelItems() {
    const response = await fetch(API_MARVEL),
          data = await response.json();

    return data
  }

  async function loadFriends() {
    const response = await fetch(API_MARVELS),
          data = await response.json();

    return data
  }

  async function loadLink(friend) {
    const response = await fetch(friend.resourceURI + '?' + API_KEY),
          data = await response.json();

    return data
  }

  window.addEventListener('DOMContentLoaded', async function(){
    const mainPagePost = createMain(),
          loading = createLoading()

    document.querySelector('body').append(createHeader(), mainPagePost.main, createFooter())

    mainPagePost.sectionHero.append(loading)
    const response = await loadMarvelItems(),
          seriesResponse = await loadFriends(),
          seriesArray = seriesResponse.data.results[0].characters.items

    let heroElem = null

    for (const hero of response.data.results) {
      if (hero.id == PAGE_ID) heroElem = hero
    }

    mainPagePost.sectionHero.append(createPost(heroElem))
    loading.remove()

    for (const friend of seriesArray.splice(1)) {
      const responseLink = await loadLink(friend)
      document.getElementById('friends').append(createPostElem(friend, responseLink))
    }

    document.getElementById('copyright').textContent = response.copyright;
  })
})()
