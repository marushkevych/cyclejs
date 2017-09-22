const {div, h1, h4, a, p, button, makeDOMDriver} = CycleDOM
const {makeHTTPDriver} = CycleHTTPDriver

function main({DOM, HTTP}) {
  const click$ = DOM.select('.get-first').events('click')
  
  const responce$ = HTTP
    .select('user-data')
    .flatten()
    .map(res => res.body)
    .startWith({})
  
  const request$ = click$.map(ev => {
    return {
      url: 'https://jsonplaceholder.typicode.com/users/1',
      method: 'GET',
      category: 'user-data'
    }
  })

  const vdom$ = responce$ .map(responce =>
    div([
      button('.get-first', 'Get first user'),
      div('.user-details', [
        h1('.user-name', responce.name),
        h4('.user-email', responce.email),
        a('.user-website', {
          attrs: {href: responce.website}
        }, responce.website)
      ])
    ])
  )

  return {
    DOM: vdom$,
    HTTP: request$
  }
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
}

Cycle.run(main, drivers)
