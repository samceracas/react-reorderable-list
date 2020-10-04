/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import { get, set } from '../lib/object'
import isEmpty from 'is-empty'
import ReOrderableList from './reorderable-list'

/**
 * A wrapper for several interacting ```ReOrderableList``` components.
 *
 * @class ReOrderableListGroup
 * @author Ezequiel Sam Ceracas
 * @version 1.0.0
 * @extends {Component}
 */
export default class ReOrderableListGroup extends Component {
  static defaultProps = {
    name: 'list',
    listGroup: []
  }

  /**
   * List update handler.
   *
   * @memberof ReOrderableListGroup
   */
  _onListUpdate = (newList, path) => {
    const listCopy = [...this.props.group]
    set(path, listCopy, newList)
    this.props.onListGroupUpdate?.(listCopy)
  }

  /**
   * List group event handler.
   *
   * @memberof ReOrderableListGroup
   */
  _onListGroupUpdate = (toUpdate) => {
    const listCopy = [...this.props.group]
    toUpdate.forEach((data) => set(data.path, listCopy, data.list))
    this.props.onListGroupUpdate?.(listCopy)
  }

  /**
   * Initializes the children. Only detects ```ReOrderableList``` components and passes special properties to them.
   *
   * @private
   * @returns {Array<ReactElement>}
   * @memberof ReOrderableListGroup
   */
  _initializeChildren() {
    let index = 0
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        if (React.isValidElement(child) && child.type === ReOrderableList) {
          const props = {
            name: this.props.name,
            list: isEmpty(child.props.list)
              ? get(index, this.props.group)
              : child.props.list,
            path: isEmpty(child.props.path) ? index : child.props.path,
            group: this.props.group,
            onListUpdate: this._onListUpdate,
            onListGroupUpdate: this._onListGroupUpdate
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
   * Renders the component.
   *
   * @returns {import("react").ReactElement}
   * @memberof ReOrderableListGroup
   */
  render() {
    return <>{this._initializeChildren()}</>
  }
}
