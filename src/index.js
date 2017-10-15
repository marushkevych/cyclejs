import isolate from '@cycle/isolate'
import sliderComponent from './SliderComponent'
const {div, makeDOMDriver} = CycleDOM

const wightSlider = isolate(sliderComponent, '.weight')
const hightSlider = isolate(sliderComponent, '.hight')

function main(sources) {
  const weightProps$ = xs.of({
    name: 'Weight',
    unit: 'kg',
    min: 40,
    max: 150,
    init: 70,
  })
  const weightSinks = wightSlider({...sources, props: weightProps$})

  const heightProps$ = xs.of({
    name: 'Height',
    unit: 'cm',
    min: 140,
    max: 220,
    init: 170,
  })
  const heightSinks = hightSlider({...sources, props: heightProps$})

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
