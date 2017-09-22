const {div, h2, label, p, button, input, makeDOMDriver} = CycleDOM

function main({DOM, HTTP}) {
  const changeWeight$ = DOM.select('.weight').events('input')
  const changeHight$ = DOM.select('.height').events('input')

  const weight$ = changeWeight$.map(ev => ev.target.value).startWith(40)
  const height$ = changeHight$.map(ev => ev.target.value).startWith(150)
  
  const state$ = xs.combine(weight$, height$)
    .map(([weight, height]) => {
      const hightMeters = height*0.01
      const bmi = Math.round(weight/(hightMeters*hightMeters))
      return {weight, height, bmi}
    })

  const vdom$ = state$.map(({weight, height, bmi}) =>
    div([
      div([
        label(`Weight: ${weight} kg`),
        input('.weight', {attrs: {
          type: 'range',
          min: 40,
          max: 150,
          value: 40
        }})
      ]),
      div([
        label(`Hight: ${height} cm`),
        input('.height', {attrs: {
          type: 'range',
          min: 150,
          max: 220,
          value: 150
        }})
      ]),
      h2(`BMI is ${bmi}`)
    ])
  )

  return {
    DOM: vdom$
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

Cycle.run(main, drivers)
