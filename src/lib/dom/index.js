import ReactDOMServer from 'react-dom/server'

/**
 * Inserts an element before the reference element.
 *
 * @export
 * @param {HTMLElement} container
 * @param {HTMLElement} referenceElement
 * @param {HTMLElement} newElement
 */
export function insertBefore(container, referenceElement, newElement) {
  container.insertBefore(newElement, referenceElement)
}

/**
 * Inserts an element after the reference element.
 *
 * @export
 * @param {HTMLElement} container
 * @param {HTMLElement} referenceElement
 * @param {HTMLElement} newElement
 */
export function insertAfter(container, referenceElement, newElement) {
  container.insertBefore(newElement, referenceElement.nextSibling)
}

/**
 * Retrieves the closest element
 * @param {Array} nodeList
 * @param {HTMLElement} targetElement
 */
export function getClosestElement(nodeList, targetElement) {
  let closestElement = nodeList[0]
  let xDiff =
    nodeList[0].getBoundingClientRect().x -
    targetElement.getBoundingClientRect().x
  let yDiff =
    nodeList[0].getBoundingClientRect().y -
    targetElement.getBoundingClientRect().y
  let dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

  nodeList.forEach((element) => {
    xDiff =
      element.getBoundingClientRect().x -
      targetElement.getBoundingClientRect().x
    yDiff =
      element.getBoundingClientRect().y -
      targetElement.getBoundingClientRect().y
    const currentDist = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
    if (currentDist < dist) {
      dist = currentDist
      closestElement = element
    }
  })
  return closestElement
}

/**
 * Generates a DOM element from an html string
 *
 * @export
 * @source https://stackoverflow.com/a/494348
 * @param {String} htmlString
 * @returns {HTMLElement}
 */
export function createElementFromHTML(htmlString) {
  var div = document.createElement('div')
  div.innerHTML = htmlString.trim()

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstElementChild
}

/**
 * Converts a JSX element to a DOM Element
 * @param {JSX.Element} jsx
 * @return {HTMLElement}
 */
export function JSXToDOMElement(jsx) {
  return createElementFromHTML(ReactDOMServer.renderToStaticMarkup(jsx))
}

/**
 * Returns the first intersecting element on the node list.
 * @param {HTMLElement} target
 * @param {NodeList} list
 * @return {HTMLElement|null}
 */
export function getIntersectingElementOnList(target, list) {
  const targetRect = target.getBoundingClientRect()
  list = [...list]
  list = list.filter((node) => {
    const nodeRect = node.getBoundingClientRect()
    return (
      nodeRect.top + nodeRect.height > targetRect.top &&
      nodeRect.left + nodeRect.width > targetRect.left &&
      nodeRect.bottom - nodeRect.height < targetRect.bottom &&
      nodeRect.right - nodeRect.width < targetRect.right
    )
  })

  if (list.length <= 0) return null

  return getClosestElement(list, target)
}
