/* eslint-disable no-unused-expressions */
import isEmpty from 'is-empty'
import PropTypes from 'prop-types'
import React, { Component, ReactElement } from 'react'
import {
  JSXToDOMElement,
  getClosestElement,
  insertAfter,
  insertBefore
} from '../lib/dom'
import ReOrderableItem from './reorderable-item'
import ListController from '../controllers/list-controller'

/**
 * A container for reorderable list items. This contains the main logic for reordering and updating items.
 *
 * @class ReOrderableList
 * @author Ezequiel Sam Ceracas
 * @version 1.0.0
 * @extends {Component}
 */
export default class ReOrderableList extends Component {
  /**
   * Define prop types.
   *
   * @static
   * @memberof ReOrderableList
   */
  static propTypes = {
    name: PropTypes.string,
    list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ]).isRequired,
    componentProps: PropTypes.object,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.instanceOf(ReactElement)
    ]).isRequired,
    group: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  /**
   * Default properties for this component.
   *
   * @static
   * @memberof ReOrderableList
   * @type {Object}
   */
  static defaultProps = {
    name: '',
    component: `div`,
    list: [],
    path: 0,
    group: null,
    orientation: 'vertical',
    placeholder: (item) => {
      return (
        <div
          style={{
            width: `${item.rect.width}px`,
            height: `${item.rect.height}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}
        />
      )
    }
  }

  /**
   * Contains the currently dragged item.
   *
   * @static
   * @private
   * @memberof ReOrderableList
   * @type {ReOrderableItem}
   */
  static _currentDraggedItem = null

  /**
   * Settings for list orientation.
   *
   * @static
   * @private
   * @memberof ReOrderableList
   * @type {Object}
   */
  static _orientationSettings = {
    vertical: {
      axis: 'y',
      size: 'height'
    },
    horizontal: {
      axis: 'x',
      size: 'width'
    }
  }

  /**
   * Creates an instance of ReOrderableList.
   *
   * @param {*} props
   * @memberof ReOrderableList
   */
  constructor(props) {
    super(props)

    this._itemPlaceholder = null
    this._controller = new ListController(props)
  }

  /**
   * Returns the instance id for this list.
   *
   * @readonly
   * @memberof ReOrderableList
   */
  get instanceID() {
    return this.controller.model.instanceID
  }

  /**
   * Returns the group id for this list.
   *
   * @readonly
   * @memberof ReOrderableList
   */
  get groupID() {
    return this.controller.model.groupID
  }

  /**
   * Returns the controller for this component.
   *
   * @type {ListController}
   * @readonly
   * @memberof ReOrderableList
   */
  get controller() {
    return this._controller
  }

  /**
   * Returns the model for this component.
   *
   * @type {List}
   * @readonly
   * @memberof ReOrderableList
   */
  get model() {
    return this._controller.model
  }

  /**
   * Returns the HTMLElement of the list.
   *
   * @public
   * @readonly
   * @memberof ReOrderableList
   * @type {HTMLElement}
   */
  get element() {
    return this._listRef
  }

  /**
   * Returns the currently dragged item.
   *
   * @public
   * @readonly
   * @memberof ReOrderableList
   * @type {ReOrderableItem}
   */
  get currentDraggedItem() {
    return ReOrderableList._currentDraggedItem
  }

  /**
   * Returns the item placeholder.
   *
   * @public
   * @readonly
   * @memberof ReOrderableList
   * @type {HTMLElement}
   */
  get itemPlaceholder() {
    if (!this._itemPlaceholder) {
      const element = this.props.placeholder?.(this.currentDraggedItem)
      this._itemPlaceholder = React.isValidElement(element)
        ? JSXToDOMElement(element)
        : element

      if (!this._itemPlaceholder.classList.contains('ui-reorderable-item')) {
        this._itemPlaceholder.classList.add('ui-reorderable-item')
      }
      if (!this._itemPlaceholder.classList.contains('item-placeholder')) {
        this._itemPlaceholder.classList.add('item-placeholder')
      }
    }
    return this._itemPlaceholder
  }

  /**
   * Returns the orientation settings.
   *
   * @public
   * @readonly
   * @memberof ReOrderableList
   * @type {Object}
   */
  get orientationSettings() {
    return ReOrderableList._orientationSettings[this.props.orientation]
  }

  /**
   * Initializes the children. Only looks for instances of ```ReOrderableItem``` and passes props to each instance.
   *
   * @private
   * @returns
   * @memberof ReOrderableList
   * @returns {Array<import("react").ReactElement>}
   */
  _initializeChildren() {
    let index = 0
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        if (React.isValidElement(child) && child.type === ReOrderableItem) {
          const props = {
            list: this,
            onItemDragStart: (item) => {
              this._onItemDragStart(item)
              if (child.props.onItemDragStart) {
                child.props.onItemDragStart(item)
              }
            },
            onItemDragEnd: (item) => {
              this._onItemDragEnd(item)
              if (child.props.onItemDragEnd) {
                child.props.onItemDragEnd(item)
              }
            },
            itemData: isEmpty(child.props.itemData)
              ? this.model.listData[index]
              : child.props.itemData,
            itemIndex: isEmpty(child.props.itemIndex)
              ? index
              : child.props.itemIndex
          }
          index++
          return React.cloneElement(child, props)
        }
        return child
      }
    )

    return childrenWithProps
  }

  /**
   * Updates the list with the new ```ReOrderableItem```.
   *
   * @private
   * @param {ReOrderableItem} item
   * @param {Number} targetIndex
   * @memberof ReOrderableList
   */
  _updateList(item, targetIndex) {
    const params = this.controller.updateList(
      item.model,
      item.listComponent.model,
      targetIndex
    )
    this.props.onListUpdate?.apply(this, params)
  }

  /**
   * Initializes drag data.
   *
   * @private
   * @param {ReOrderableItem} item
   * @memberof ReOrderableList
   */
  _initDragData(item) {
    ReOrderableList._currentDraggedItem = item
  }

  /**
   * Resets the drag data.
   *
   * @private
   * @memberof ReOrderableList
   */
  _resetDragData() {
    ReOrderableList._currentDraggedItem = null
    this._removePlaceholders()
    this._itemPlaceholder = null
  }

  /**
   * Removes all placeholders from every list container.
   *
   * @private
   * @memberof ReOrderableList
   */
  _removePlaceholders() {
    const placeholder = document.querySelector(
      '.ui-reorderable-list .ui-reorderable-item.item-placeholder'
    )
    placeholder?.remove()
  }

  /**
   * Item drag start event handler.
   *
   * @private
   * @memberof ReOrderableList
   */
  _onItemDragStart = ({ item }) => {
    this._initDragData(item)
  }

  /**
   * Item drag end event handler.
   *
   * @private
   * @memberof ReOrderableList
   */
  _onItemDragEnd = () => {
    this._resetDragData()
  }

  /**
   * Drag exit event handler.
   *
   * @private
   * @memberof ReOrderableList
   */
  _onDragExit = () => {
    this._removePlaceholders()
  }

  /**
   * Drag over event handler.
   *
   * @private
   * @memberof ReOrderableList
   */
  _onDragOver = (event) => {
    const { item } = event.detail
    event.stopPropagation()
    this.itemPlaceholder?.remove()

    const filteredItems = [
      ...this.element.querySelectorAll(
        `.ui-reorderable-item.${this.instanceID}:not([hidden])`
      )
    ]

    if (filteredItems.length <= 0) {
      this.element.appendChild(this.itemPlaceholder)
      return
    }

    const closestElement = getClosestElement(filteredItems, item.draggedElement)

    const closestElementRect = closestElement.getBoundingClientRect()
    const draggedElementRect = item.draggedElement.getBoundingClientRect()
    const draggedElementAxis = Math.floor(
      draggedElementRect[this.orientationSettings.axis]
    )
    const closestRectYAxis = Math.floor(
      closestElementRect[this.orientationSettings.axis] +
        closestElementRect[this.orientationSettings.size] / 2
    )
    const insertFunction =
      closestRectYAxis > draggedElementAxis ? insertBefore : insertAfter
    insertFunction(this.element, closestElement, this.itemPlaceholder)
  }

  /**
   * Drop event handler.
   *
   * @private
   * @memberof ReOrderableList
   */
  _onDrop = (event) => {
    const { item } = event.detail
    event.stopPropagation()

    const filteredItems = [
      ...this.element.querySelectorAll(`.ui-reorderable-item:not([hidden])`)
    ]

    const index = filteredItems.findIndex((item) =>
      item.classList.contains('item-placeholder')
    )

    this._updateList(item, index)
  }

  /**
   * Renders the component.
   *
   * @returns {import("react").ReactElement}
   * @memberof ReOrderableList
   */
  render() {
    const CustomComponent = this.props.component
    this._controller = new ListController(this.props)

    return (
      <CustomComponent
        {...this.props.componentProps}
        ref={(ref) => (this._listRef = ref)}
        className={[
          'ui-reorderable-list',
          this.instanceID,
          this.groupID,
          this.props.componentProps?.className
        ].join(' ')}
        onDrop={this._onDrop}
        onDragOver={this._onDragOver}
        onDragExit={this._onDragExit}
      >
        {this._initializeChildren()}
      </CustomComponent>
    )
  }
}
