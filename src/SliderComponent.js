const {div, h2, label, p, button, input} = CycleDOM

function SliderComponent(min, max, name, unit) {
  
    function main({DOM}) {
      return {
        DOM: view(model(intent(DOM)))
      }
    }
    
    function intent(DOM) {
      const sliderChange$ = DOM.select('.slider').events('input')
    
      const sliderValue$ = sliderChange$.map(ev => ev.target.value)
    
      return sliderValue$
    }

    function model(sliderValue$) {
      return sliderValue$.startWith(min).map(value => {
        return {value}
      })
    }
    
    function view(state$) {
      const vdom$ = state$.map(({value}) =>
        div([
          label(`${name}: ${value} ${unit}`),
          input('.slider', {attrs: {
            type: 'range',
            min,
            max,
            value
          }})
        ])
      )
    
      return vdom$
    }
  
    return main
  }

  module.exports = SliderComponent