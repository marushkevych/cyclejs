const {div, label, p, button, makeDOMDriver} = CycleDOM

function main({DOM}) {
  const decClick$ = DOM.select('.dec').events('click')
  const incClick$ = DOM.select('.inc').events('click')

  const dec$ = decClick$.map(() => -1) // --(-1)----------(-1)--->
  const inc$ = incClick$.map(() => +1) // --------(+1)----------->

  const delta$ = xs.merge(dec$, inc$)  // --(-1)--(+1)----(-1)--->

  const number$ = delta$.fold((prev, x) => prev + x, 0)

  return {
    DOM: number$.map(number =>
      div([
        p([
          label(`Count ${number}`)
        ]),
        button('.dec', 'Decrement'),
        button('.inc', 'Increment'),
      ])
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

Cycle.run(main, drivers)
