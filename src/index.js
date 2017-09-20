
function main(sources) {
  
  const click$ = sources.DOM
  
  const DOM = click$
    .startWith(null)
    .map(() => xs.periodic(1000).fold(prev => prev + 1, 0))
    .flatten()
    .map(i => `Seconds elapsed: ${i}`)  
  
  const log = click$
    .map(() => `Restarted!`)  
  
  return {
    DOM,
    log
  }
}

function domDriver(text$) {
  text$.subscribe({
    next: str => {
      const elem = document.querySelector('#app')
      elem.textContent = str
    }
  })
  
  const domSource = fromEvent(document, 'click')
  return domSource
}

function logDriver(msg$) {
  msg$.subscribe({
    next: msg => console.log(msg)
  })
}


function run(mainFn, drivers) {
  const sources = {}
  const fakeSinks = {}
  
  // call each driver with fake sink and gather sources
  Object.entries(drivers).forEach(([key, driver]) => {
    const fakeSink = xs.create()
    fakeSinks[key] = fakeSink
    sources[key] = driver(fakeSink)
  }) 
  
  // get real sinks and
  // replace each fake sink with real one
  const sinks = mainFn(sources)
  Object.entries(sinks).forEach(([key, sink]) => {
    fakeSinks[key].imitate(sink)
  })
}

run(main, {
  DOM: domDriver,
  log: logDriver
})
