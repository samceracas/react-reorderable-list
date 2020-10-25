import ReactDOMServer from 'react-dom/server'
import { distance } from '../math'

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
  let dist = distance(
    closestElement.getBoundingClientRect(),
    targetElement.getBoundingClientRect()
  )

  nodeList.forEach((element) => {
    const currentDist = distance(
      element.getBoundingClientRect(),
      targetElement.getBoundingClientRect()
    )
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
 * Checks if two rectangles intersect.
 *
 * @param {*} r1
 * @param {*} r2
 * @returns {Boolean}
 */
function intersectRect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  )
}

/**
 * Returns the first intersecting element on the node list.
 * @param {HTMLElement} target
 * @param {NodeList} list
 * @return {HTMLElement|null}
 */
export function getIntersectingElementOnList(target, list) {
  const targetRect = target.getBoundingClientRect()
  list = list.filter((node) => {
    const nodeRect = node.getBoundingClientRect()
    return intersectRect(nodeRect, targetRect)
  })

  if (list.length <= 0) return null

  return list[0]
}

/**
 * Detects if the current device has a touch screen.
 *
 * @source https://www.labnol.org/code/19616-detect-touch-screen-javascript
 * @export
 * @returns {Boolean}
 */
export function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.MaxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}

/**
 * Appends a class or an array of classes to the element if it doesn't exist.
 *
 * @export
 * @param {HTMLElement} element The element to append the class
 * @param {String|Array} className The class name or a list of class names to append.
 */
export function appendClassIfNotExists(element, className) {
  if (Array.isArray(className)) {
    className.forEach((val) => {
      if (!element.classList.contains(val)) {
        element.classList.add(val)
      }
    })
  } else {
    if (!element.classList.contains(className)) {
      element.classList.add(className)
    }
  }
}

/**
 * Removes a class or an array of classes to the element if it exists.
 *
 * @export
 * @param {HTMLElement} element The element to remove classes
 * @param {String|Array} className The class name or a list of class names to remove.
 */
export function removeClassIfExists(element, className) {
  if (Array.isArray(className)) {
    className.forEach((val) => {
      if (element.classList.contains(val)) {
        element.classList.remove(val)
      }
    })
  } else {
    if (element.classList.contains(className)) {
      element.classList.remove(className)
    }
  }
}
