/* eslint-disable no-unused-expressions */
import React, { Component, createRef } from 'react'
import {
  getIntersectingElementOnList,
  isTouchDevice,
  JSXToDOMElement
} from '../lib/dom'
import ListItem from '../models/list-item'
import styles from '../css/reorderable-item.css'
import { distance } from '../lib/math'

/**
 * A wrapper for reorderable items. Handles drag and drop logic.
 *
 * @class ReOrderableItem
 * @author Ezequiel Sam Ceracas
 * @version 1.0.0
 * @extends {Component}
 */
export default class ReOrderableItem extends Component {
  /**
   * Default properties for this component.
   *
   * @static
   * @memberof ReOrderableItem
   */
  static defaultProps = {
    drag: (item) => {
      const itemCopy = item.clonedItemElement
      itemCopy.style.width = `${item.rect.width}px`
      itemCopy.style.height = `${item.rect.height}px`
      itemCopy.style.zIndex = '9000'
      return itemCopy
    },
    component: `div`,
    componentProps: null,
    itemIndex: 0,
    itemData: null
  }

  /**
   * Creates an instance of ReOrderableItem.
   *
   * @param {*} props
   * @memberof ReOrderableItem
   */
  constructor(props) {
    super(props)

    this._beforeDragRect = null
    this._halfWidth = null
    this._halfHeight = null

    this._offset = {
      x: 0,
      y: 0
    }

    this._dragTrigger = {
      mouseDown: false,
      prevX: 0,
      prevY: 0
    }

    this._inputEvents = {
      touch: {
        down: 'touchstart',
        up: 'touchend',
        move: 'touchmove'
      },
      click: {
        down: 'mousedown',
        up: 'mouseup',
        move: 'mousemove'
      }
    }

    this._itemRef = null

    this._isDragging = false
    this._draggedElement = null
    this._overlappingList = null
    this._clonedItem = null

    this._model = new ListItem(props)

    this._onItemMouseMove = this._onItemMouseMove.bind(this)
    this._onItemMouseUp = this._onItemMouseUp.bind(this)
    this._onItemMouseDown = this._onItemMouseDown.bind(this)

    this._handleDrag = this._handleDrag.bind(this)
    this._handleDragStart = this._handleDragStart.bind(this)
    this._handleDragEnd = this._handleDragEnd.bind(this)
    this._itemRef = createRef()
  }

  /**
   * Returns the instance id for this item.
   *
   * @type {String}
   * @readonly
   * @memberof ReOrderableItem
   */
  get instanceID() {
    return this._model.instanceID
  }

  /**
   * Returns the ```ListItem``` model for this component.
   *
   * @type {ListItem}
   * @readonly
   * @memberof ReOrderableItem
   */
  get model() {
    return this._model
  }

  /**
   * Returns the HTMLElement of the dragged item. This becomes ```null``` when no drag and drop action is happening.
   *
   * @type {HTMLElement|null}
   * @readonly
   * @memberof ReOrderableItem
   */
  get draggedElement() {
    if (!this._draggedElement) {
      const element = this.props.drag?.(this)
      this._draggedElement = React.isValidElement(element)
        ? JSXToDOMElement(element)
        : element
    }
    return this._draggedElement
  }

  /**
   * Returns the list component this item is part of.
   *
   * @type {ReOrderableList}
   * @readonly
   * @memberof ReOrderableItem
   */
  get listComponent() {
    return this.props.list
  }

  /**
   * Returns the overlapping list element. This becomes ```null``` when there are no overlapping lists.
   *
   * @type {HTMLElement|null}
   * @readonly
   * @memberof ReOrderableItem
   */
  get overlappingListElement() {
    return this._overlappingList
  }

  /**
   * Clones and returns a copy of the item element. Will not reclone once there's an instantiated instance of the clone.
   *
   * @type {Node}
   * @readonly
   * @memberof ReOrderableItem
   */
  get clonedItemElement() {
    if (!this._clonedItem) {
      this._clonedItem = this._itemRef.cloneNode(true)
    }
    return this._clonedItem
  }

  /**
   * Returns the bounding client rect of the item element.
   *
   * @type {ClientRect}
   * @readonly
   * @memberof ReOrderableItem
   */
  get rect() {
    return this._beforeDragRect
  }

  /**
   * Component mount hook.
   *
   * @memberof ReOrderableItem
   */
  componentDidMount() {
    const inputControl = isTouchDevice() ? 'touch' : 'click'
    const inputEvents = this._inputEvents[inputControl]

    document.addEventListener(inputEvents.move, this._handleDrag, {
      passive: false
    })
    document.addEventListener(inputEvents.up, this._handleDragEnd)
    this._itemRef.addEventListener(inputEvents.down, this._onItemMouseDown)
    this._itemRef.addEventListener(inputEvents.move, this._onItemMouseMove)
    this._itemRef.addEventListener(inputEvents.up, this._onItemMouseUp)
  }

  /**
   * Component unmount hook.
   *
   * @memberof ReOrderableItem
   */
  componentWillUnmount() {
    const inputControl = isTouchDevice() ? 'touch' : 'click'
    const inputEvents = this._inputEvents[inputControl]
    document.removeEventListener(inputEvents.move, this._handleDrag, {
      passive: false
    })
    document.removeEventListener(inputEvents.up, this._handleDragEnd)
    this._itemRef.removeEventListener(inputEvents.down, this._onItemMouseDown)
    this._itemRef.removeEventListener(inputEvents.move, this._onItemMouseMove)
    this._itemRef.removeEventListener(inputEvents.up, this._onItemMouseUp)
  }

  /**
   * Dispatches a custom event.
   *
   * @private
   * @param {HTMLElement} targetElement
   * @param {String} event
   * @param {Object} detail
   * @memberof ReOrderableItem
   */
  _dispatchCustomEvent(targetElement, event, detail) {
    targetElement.dispatchEvent(
      // eslint-disable-next-line no-undef
      new CustomEvent(event, {
        bubbles: true,
        cancelable: true,
        detail
      })
    )
  }

  /**
   * Checks for overlapping list containers. Will dispatch the following events:
   *  * dragexit - Dispatched when exiting a list container.
   *  * dragenter - Dispatched when entering a list container.
   *  * dragover - Dispatches when the dragged element is moved within the list container.
   *
   * @private
   * @returns {void}
   * @memberof ReOrderableItem
   */
  _checkOverlappingElements() {
    const list = Array.prototype.slice.call(this._groupListElements)
    const previousList = this._overlappingList

    this._overlappingList = getIntersectingElementOnList(
      this.draggedElement,
      list
    )

    if (previousList && !this._overlappingList) {
      this._dispatchCustomEvent(previousList, 'dragexit', {
        item: this
      })
    }

    if (!this._overlappingList) {
      if (!document.body.classList.contains(styles.noDrop)) {
        document.body.classList.add(styles.noDrop)
      }
      return
    }

    if (
      !previousList ||
      (previousList && previousList !== this._overlappingList)
    ) {
      if (previousList && previousList !== this._overlappingList) {
        this._dispatchCustomEvent(previousList, 'dragexit', {
          item: this
        })
      }

      this._dispatchCustomEvent(this._overlappingList, 'dragenter', {
        item: this
      })
      if (document.body.classList.contains(styles.noDrop)) {
        document.body.classList.remove(styles.noDrop)
      }
    }

    this._dispatchCustomEvent(this._overlappingList, 'dragover', {
      item: this
    })
  }

  _handleDrag(event) {
    if (!this._isDragging) return
    if (isTouchDevice()) event.preventDefault()
    const input = isTouchDevice() ? event.changedTouches[0] : event
    const dragX = input.pageX - this._halfWidth - this._offset.x
    const dragY = input.pageY - this._halfHeight - this._offset.y

    this.draggedElement.style.left = `${dragX}px`
    this.draggedElement.style.top = `${dragY}px`

    this._checkOverlappingElements()

    this.props.onItemDrag?.({
      item: this,
      dragX,
      dragY,
      pageX: input.pageX,
      pageY: input.pageY,
      clientX: input.clientX,
      clientY: input.clientY
    })
  }

  _handleDragEnd(event) {
    if (!this._isDragging) return
    const input = isTouchDevice() ? event.changedTouches[0] : event

    if (document.body.classList.contains(styles.noDrop)) {
      document.body.classList.remove(styles.noDrop)
    }

    if (this._overlappingList) {
      this._overlappingList.dispatchEvent(
        // eslint-disable-next-line no-undef
        new CustomEvent('drop', {
          bubbles: true,
          cancelable: true,
          detail: {
            item: this,
            list: this.listComponent
          }
        })
      )
    }

    this.props.onItemDragEnd?.({
      item: this,
      pageX: input.pageX,
      pageY: input.pageY,
      clientX: input.clientX,
      clientY: input.clientY
    })

    this._overlappingList = null
    this._isDragging = false
    if (this._itemRef) {
      this._itemRef.style.display = ''
      this._itemRef.hidden = false
    }

    this._clonedItem = null
    this._draggedElement?.remove()
    this._draggedElement = null
  }

  _handleDragStart(event) {
    if (this._isDragging) return

    document.getSelection().empty()

    const input = isTouchDevice() ? event.changedTouches[0] : event
    this._clonedItem = null
    this._beforeDragRect = this._itemRef.getBoundingClientRect()
    this._groupListElements = document.querySelectorAll(
      `.${this.listComponent.model.groupID}`
    )

    if (!this._halfWidth && !this._halfHeight) {
      this._halfWidth = this._beforeDragRect.width / 2
      this._halfHeight = this._beforeDragRect.height / 2
    }

    this._offset = {
      x: input.clientX - this._beforeDragRect.left - this._halfWidth,
      y: input.clientY - this._beforeDragRect.top - this._halfHeight
    }

    const dragX = input.pageX - this._halfWidth - this._offset.x
    const dragY = input.pageY - this._halfHeight - this._offset.y

    this._isDragging = true

    this.draggedElement.style.position = 'absolute'
    this.draggedElement.style.left = `${dragX}px`
    this.draggedElement.style.top = `${dragY}px`

    document.body.appendChild(this.draggedElement)

    this._itemRef.style.display = 'none'
    this._itemRef.hidden = true

    this.props.onItemDragStart?.({
      item: this,
      dragX,
      dragY,
      pageX: input.pageX,
      pageY: input.pageY,
      clientX: input.clientX,
      clientY: input.clientY
    })

    this._checkOverlappingElements()
  }

  /**
   * Mouse move event handler.
   *
   * @private
   * @memberof ReOrderableItem
   */
  _onItemMouseMove = (event) => {
    const input = isTouchDevice() ? event.changedTouches[0] : event

    if (this._dragTrigger.mouseDown && !this._isDragging) {
      const dist = distance(
        {
          x: input.pageX,
          y: input.pageY
        },
        {
          x: this._dragTrigger.prevX,
          y: this._dragTrigger.prevY
        }
      )
      if (dist >= 1) {
        this._dragTrigger.mouseDown = false
        this._handleDragStart(event)
      }
    }
  }

  /**
   * Mouse up event handler.
   *
   * @private
   * @memberof ReOrderableItem
   */
  _onItemMouseUp = (event) => {
    if (this._dragTrigger.mouseDown) {
      this._dragTrigger.mouseDown = false
    }
  }

  /**
   * Mouse down event handler.
   *
   * @private
   * @memberof ReOrderableItem
   */
  _onItemMouseDown = (event) => {
    const input = isTouchDevice() ? event.changedTouches[0] : event
    const firstMatch = document
      .elementsFromPoint(input.clientX, input.clientY)
      .find((e) => e.classList.contains('ui-reorderable-item'))
    if (firstMatch !== this._itemRef || this._dragTrigger.mouseDown) return
    this._dragTrigger.mouseDown = true
    this._dragTrigger.prevX = input.pageX
    this._dragTrigger.prevY = input.pageY
  }

  /**
   * Renders the component.
   *
   * @returns {import("react").ReactElement}
   * @memberof ReOrderableItem
   */
  render() {
    const Component = this.props.component
    this._model = new ListItem(this.props)

    return (
      <Component
        {...this.props.componentProps}
        className={[
          'ui-reorderable-item',
          styles.uiItem,
          this.listComponent.instanceID,
          this.instanceID,
          this.props.componentProps?.className
        ].join(' ')}
        ref={(ref) => (this._itemRef = ref)}
      >
        {React.Children.only(this.props.children)}
      </Component>
    )
  }
}
