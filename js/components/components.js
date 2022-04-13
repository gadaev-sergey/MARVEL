export {createHeader, createFooter, createElem, createLoading}

function createHeader() {
  const header = createElem('header', {
          classList: ['header']
        }),
        logo = createElem('a', {
          classList: ['logo'],
          href: 'index.html'
        }, header),
        logoImage = createElem('img', {
          classList: ['logo__img'],
          src: 'img/logo.svg',
          alt: 'Marvel'
        }, logo)

  return header
}

function createFooter() {
  const footer = createElem('footer', {
          classList: ['footer']
        }),
        copyright = createElem('a', {
          classList: ['copyright'],
          href: 'https://developer.marvel.com/',
          id: 'copyright',
          target: "_blank"
        }, footer)

  return footer
}

function createElem(el, options, parent) {
  const elem = document.createElement(el)
  for (const key in options) {
    if (key === 'classList') {
      for (const e of options[key]) elem.classList.add(e)
      continue
    }
    if (key === 'dataset') elem.dataset[options[key].dataName] = options[key].dataValue
    if (key === 'style') elem.style[options[key].dataName] = options[key].dataValue
    elem[key] = options[key]
  }
  if (parent) parent.append(elem)
  return elem
}

function createLoading() {
  const loading = createElem('div', {
          classList: ['loading']
        }),
        loadingIcon = createElem('div', {
          classList: ['loading__icon']
        }, loading),
        loadingTitle = createElem('div', {
          textContent: 'Loading...',
          classList: ['loading__title']
        }, loading)

  return loading
}
