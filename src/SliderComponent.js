import  {div, h2, label, p, button, input} from '@cycle/dom'
  
function sliderComponent({DOM, props}) {
  const actions = intent(DOM)
  const state$ = model(actions, props)
  return {
    DOM: view(state$),
    value: state$.map(state => state.value)
  }
}

function intent(DOM) {
  const sliderChange$ = DOM.select('.slider').events('input')

  const sliderValue$ = sliderChange$.map(ev => ev.target.value)

  return {sliderValue$}
}

function model(actions, props$) {
  return props$.map(props => {
    const {init, name, unit, min, max} = props
    return actions.sliderValue$.startWith(init).map(value => {
      return {value, name, unit, min, max}
    })
  }).flatten().remember()
}

function view(state$) {
  const vdom$ = state$.map(({value, name, unit, min, max}) =>
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
  
module.exports = sliderComponent