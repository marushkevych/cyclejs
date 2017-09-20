const {h, h1, span, makeDOMDriver} = CycleDOM

function main(sources) {
  const mouseover$ = sources.DOM.select('h1').events('mouseover')
  
  const DOM = mouseover$
    .startWith(null)
    .map(() => xs.periodic(1000)
    .fold(prev => prev + 1, 0))
    .flatten()
    .map(i => 
      h1({style: {backgroundColor: 'red'}},[
        span([
          `Seconds elapsed: ${i}`
        ])
      ])
    )

  const log = mouseover$.map(() => `Restarted!`)  
  
  return {
    DOM,
    log
  }
}

function logDriver(msg$) {
  msg$.subscribe({
    next: msg => console.log(msg)
  })
}


Cycle.run(main, {
  DOM: makeDOMDriver('#app'),
  log: logDriver
})