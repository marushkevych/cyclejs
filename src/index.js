const SliderComponent = require('./SliderComponent')
const {div, makeDOMDriver} = CycleDOM

const wightSlider = SliderComponent(40, 150, 'Weight', 'kg')
const hightSlider = SliderComponent(140, 220, 'Height', 'cm')

function main(sources) {
  // preprocess sources to select isolate scope
  const weightDOMSource = sources.DOM.select('.weight')
  const heightDOMSource = sources.DOM.select('.height')


  const weightSinks = wightSlider({DOM: weightDOMSource})
  const weightVDOM$ = weightSinks.DOM.map(vdom => {
    // mark with class for isolate scope
    vdom.sel += '.weight'
    return vdom
  })
  
  const heightSinks = hightSlider({DOM: heightDOMSource})
  const heightVDOM$ = heightSinks.DOM.map(vdom => {
    // mark with class for isolate scope
    vdom.sel += '.height'
    return vdom
  })

  const vdom$ = xs.combine(weightVDOM$, heightVDOM$)
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
