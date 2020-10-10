/* eslint-disable no-unused-expressions */
import React, { Component, createRef } from 'react'
import { getIntersectingElementOnList, JSXToDOMElement } from '../lib/dom'
import ListItem from '../models/list-item'

/**
 * A wrapper for reorderable items. Handles drag and drop logic.
 * This partially uses the HTML drag and drop API but the rest of the logic is handled through mouse API.
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

    this._itemRef = null

    this._isDragging = false
    this._draggedElement = null
    this._overlappingList = null
    this._clonedItem = null

    this._model = new ListItem(props)

    this._onMouseMove = this._onMouseMove.bind(this)
    this._onMouseUp = this._onMouseUp.bind(this)
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
      element.style.zIndex = '99999'
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
    document.addEventListener('mousemove', this._onMouseMove)
    document.addEventListener('mouseup', this._onMouseUp)
  }

  /**
   * Component unmount hook.
   *
   * @memberof ReOrderableItem
   */
  componentWillUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove)
    document.removeEventListener('mouseup', this._onMouseUp)
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
    const list = document.querySelectorAll(
      `.${this.listComponent.model.groupID}`
    )
    const previousList = this._overlappingList

    document.body.style.cursor = ''

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
      document.body.style.cursor = 'no-drop'
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
    }

    this._dispatchCustomEvent(this._overlappingList, 'dragover', {
      item: this
    })
  }

  /**
   * Mouse move event handler.
   *
   * @private
   * @memberof ReOrderableItem
   */
  _onMouseMove = (event) => {
    if (!this._isDragging) return

    const dragX = event.pageX - this._halfWidth - this._offset.x
    const dragY = event.pageY - this._halfHeight - this._offset.y

    this.draggedElement.style.left = `${dragX}px`
    this.draggedElement.style.top = `${dragY}px`

    this._checkOverlappingElements()

    this.props.onItemDrag?.({
      item: this,
      dragX,
      dragY,
      pageX: event.pageX,
      pageY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY
    })
  }

  /**
   * Mouse up event handler.
   *
   * @private
   * @memberof ReOrderableItem
   */
  _onMouseUp = (event) => {
    if (!this._isDragging) return

    document.body.style.cursor = ''

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
      pageX: event.pageX,
      pageY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY
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

  /**
   * Drag start event handler.
   *
   * @private
   * @memberof ReOrderableItem
   */
  _onDragStart = (event) => {
    if (this._isDragging) return

    event.preventDefault()
    event.stopPropagation()

    this._clonedItem = null
    this._beforeDragRect = this._itemRef.getBoundingClientRect()

    if (!this._halfWidth && !this._halfHeight) {
      this._halfWidth = this._beforeDragRect.width / 2
      this._halfHeight = this._beforeDragRect.height / 2
    }

    this._offset = {
      x: event.clientX - this._beforeDragRect.left - this._halfWidth,
      y: event.clientY - this._beforeDragRect.top - this._halfHeight
    }

    const dragX = event.pageX - this._halfWidth - this._offset.x
    const dragY = event.pageY - this._halfHeight - this._offset.y

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
      pageX: event.pageX,
      pageY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY
    })

    this._checkOverlappingElements()
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
          this.listComponent.instanceID,
          this.model.instanceID,
          this.props.componentProps?.className
        ].join(' ')}
        ref={(ref) => (this._itemRef = ref)}
        onDragStart={this._onDragStart}
        draggable
      >
        {React.Children.only(this.props.children)}
      </Component>
    )
  }
}
