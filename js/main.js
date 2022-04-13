import {PAGE_PARAMS, URL, API_KEY} from '/js/components/const.js';
import {createHeader, createFooter, createElem, createLoading} from '/js/components/components.js';

(() => {
  const PAGE_NUMBER = PAGE_PARAMS.get('page'),
        LIMIT = 18,
        OFFSET = PAGE_NUMBER ? LIMIT * (PAGE_NUMBER - 1) : 0,
        API_MARVEL = `http://${URL}?limit=${LIMIT}&offset=${OFFSET}&${API_KEY}`,
        IMG_ICON_PREFIX = "/standard_small"

  function createMain() {
    let numberPage = 1;
    const main = createElem('main', {
            classList: ['main']
          }),
          sectionHero = createElem('section', {
            classList: ['hero']
          }, main),
          title = createElem('h1', {
            classList: ['title'],
            textContent: 'Marvel hero list'
          }, sectionHero),
          list = createElem('ul', {
            classList: ['hero__list', 'list-reset']
          }, sectionHero),
          pagination = createElem('div', {
            classList: ['pagination']
          }, sectionHero),
          paginationLink1 = createElem('a', {
            classList: ['pagination__link'],
            textContent: numberPage,
            id: numberPage,
            href: `?page=${numberPage++}`
          }, pagination),
          paginationLink2 = createElem('a', {
            classList: ['pagination__link'],
            textContent: numberPage,
            id: numberPage,
            href: `?page=${numberPage++}`
          }, pagination),
          paginationLink3 = createElem('a', {
            classList: ['pagination__link'],
            textContent: numberPage,
            id: numberPage,
            href: `?page=${numberPage++}`
          }, pagination),
          paginationLink4 = createElem('a', {
            classList: ['pagination__link'],
            textContent: numberPage,
            id: numberPage,
            href: `?page=${numberPage++}`
          }, pagination),
          paginationLink5 = createElem('a', {
            classList: ['pagination__link'],
            textContent: numberPage,
            id: numberPage,
            href: `?page=${numberPage++}`
          }, pagination),
          paginationLink6 = createElem('a', {
            classList: ['pagination__link'],
            textContent: numberPage,
            id: numberPage,
            href: `?page=${numberPage++}`
          }, pagination)

    return {
      main,
      list
    }
  }

  function createListItems(hero) {
    const item = createElem('li',{
            classList: ['hero__item']
          }),
          link = createElem('a', {
            classList: ['hero__link'],
            href: `posts.html?id=${hero.id}`
          }, item),
          image = createElem('img', {
            classList: ['hero__img'],
            src: hero.thumbnail.path + IMG_ICON_PREFIX + '.' + hero.thumbnail.extension,
            alt: 'Marvel'
          }, link),
          title = createElem('h2', {
            classList: ['hero__title'],
            textContent: hero.name
          }, link)

    return item
  }

  async function loadMarvelItems() {
    const response = await fetch(API_MARVEL),
          data = await response.json();

    return data
  }

  window.addEventListener('DOMContentLoaded', async function(){
    const mainPageIndex = createMain(),
          idNumber = PAGE_NUMBER ? PAGE_NUMBER : 1,
          loading = createLoading()

    document.querySelector('body').append(createHeader(), mainPageIndex.main, createFooter())

    mainPageIndex.list.append(loading)
    const response = await loadMarvelItems()
    loading.remove()


    document.getElementById('copyright').textContent = response.copyright;
    document.getElementById(idNumber).classList.add('check');

    for (const hero of response.data.results) mainPageIndex.list.append(createListItems(hero))
  })
})()
