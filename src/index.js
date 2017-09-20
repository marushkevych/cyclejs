function main(sources) {
  
  const click$ = sources.DOM
  
  const DOM = click$
    .startWith(null)
    .map(() => xs.periodic(1000)
    .fold(prev => prev + 1, 0))
    .flatten()
    .map(i => ({
      tagName: 'H1',
      children: [
        `Seconds elapsed: ${i}`
      ]
    }))  
    
  const log = click$.map(() => `Restarted!`)  
  
  return {
    DOM,
    log
  }
}

function createElement(obj) {
  const element = document.createElement(obj.tagName)
  element.textContent = obj.children[0]
  return element
}

function domDriver(obj$) {
  obj$.subscribe({
    next: obj => {
      const container = document.querySelector('#app')
      container.appendChild(createElement(obj))
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


Cycle.run(main, {
  DOM: domDriver,
  log: logDriver
})