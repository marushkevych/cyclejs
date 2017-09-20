function main(sources) {
  
  const click$ = sources.DOM
  
  const DOM = click$
    .startWith(null)
    .map(() => xs.periodic(1000)
    .fold(prev => prev + 1, 0))
    .flatten()
    .map(i => ({
      tagName: 'H1',
      children: [{
        tagName: 'span',
        children: [`Seconds elapsed: ${i}`]
      }]
    }))  
    
  const log = click$.map(() => `Restarted!`)  
  
  return {
    DOM,
    log
  }
}

function createElement({tagName, children}) {
  const element = document.createElement(tagName)
  children.forEach(function(child) {
    if (typeof child === 'object') {
      element.appendChild(createElement(child))
    }
    else {
      element.textContent = child
    }
  });
  return element
}

function domDriver(obj$) {
  obj$.subscribe({
    next: obj => {
      const container = document.querySelector('#app')
      container.textContent = ''
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