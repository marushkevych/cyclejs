import { run } from "@cycle/run"
import xs from "xstream"
import isolate from '@cycle/isolate'
import sliderComponent from './SliderComponent'
import {div, h2, makeDOMDriver} from '@cycle/dom'

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

  const bmi$ = xs.combine(weightSinks.value, heightSinks.value)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters))
      return bmi;
    })

  const vdom$ = xs.combine(bmi$, weightSinks.DOM, heightSinks.DOM)
    .map(([bmi, weightVDOM, heightVDOM]) => 
      div([
        weightVDOM,
        heightVDOM,
        h2('BMI: ' + bmi)
      ])
    )

  return {
    DOM: vdom$
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
