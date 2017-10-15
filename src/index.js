const isolate = require('@cycle/isolate').default
const SliderComponent = require('./SliderComponent')
const {div, makeDOMDriver} = CycleDOM

const wightSlider = isolate(SliderComponent(40, 150, 'Weight', 'kg'), '.weight')
const hightSlider = isolate(SliderComponent(140, 220, 'Height', 'cm'), '.hight')

function main(sources) {

  const weightSinks = wightSlider(sources)
  const heightSinks = hightSlider(sources)

  const vdom$ = xs.combine(weightSinks.DOM, heightSinks.DOM)
    .map(([weightVDOM, heightVDOM]) => 
      div([
        weightVDOM,
        heightVDOM
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
