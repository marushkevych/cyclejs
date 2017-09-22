const {div, label, input, hr, h1, makeDOMDriver} = CycleDOM

function main({DOM}) {
  const inputEv$ = DOM.select('.name').events('input')
  const name$ = inputEv$.map(ev => ev.target.value).startWith('')

  return {
    DOM: name$.map(name =>
      div([
        label('Name:'),
        input('.name', {attrs: {type: 'text'}}),
        hr(),
        h1(`Hello ${name}!`)
      ])
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

Cycle.run(main, drivers)
