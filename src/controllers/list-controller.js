/* eslint-disable no-unused-expressions */
import arrayMove from 'array-move'
import { set } from '../lib/object'
import List from '../models/list'

/**
 * Controller for managing lists.
 *
 * @export
 * @class ListController
 * @author Ezequiel Sam Ceracas
 * @version 1.0.0
 */
export default class ListController {
  /**
   * Creates an instance of ListController.
   * @param {*} props
   * @memberof ListController
   */
  constructor(props) {
    this._model = new List(props)
  }

  /**
   * Returns the ```List``` model for this controller.
   *
   * @readonly
   * @memberof ListController
   */
  get model() {
    return this._model
  }

  /**
   * Moves an item to the target index.
   *
   * @param {*} sourceItem
   * @param {*} targetIndex
   * @memberof ListController
   */
  moveItem(sourceItem, targetIndex) {
    let targetList = [...this.model.listData]
    const itemIndex = sourceItem.index
    targetList = arrayMove(targetList, itemIndex, targetIndex)
    let params = [targetList, this.model.path]
    if (this.model.group) {
      const groupCopy = [...this.model.group]
      set(this.model.path, groupCopy, targetList)
      params = [groupCopy]
    }
    return params
  }

  /**
   * Transfers an item to this list.
   *
   * @param {*} sourceItem
   * @param {*} [sourceList]
   * @param {*} targetIndex
   * @memberof ListController
   */
  transferItem(sourceItem, sourceList, targetIndex) {
    let targetList = [...this.model.listData]
    const itemData = sourceItem.data
    const itemIndex = sourceItem.index

    const sourceListPath = sourceList.path
    // make a copy of the group
    const groupCopy = [...this.model.group]
    // remove the source item from its list
    const sourceListData = sourceList.listData.filter(
      (item, index) => index !== itemIndex
    )
    // add the item to the new list
    targetList.push(itemData)
    // move the newly added item to the target index
    targetList = arrayMove(targetList, targetList.length - 1, targetIndex)
    // set the new source and target list
    set(sourceListPath, groupCopy, sourceListData)
    set(this.model.path, groupCopy, targetList)

    // return the group
    return [groupCopy]
  }

  /**
   * Transfers an item from one list to another or reorders the items if the ```sourceList``` is null.
   *
   * @param {ListItem} sourceItem
   * @param {Number} targetIndex
   * @param {List} sourceList
   * @memberof ListController
   */
  updateList(sourceItem, sourceList, targetIndex) {
    sourceList = !sourceList ? this.model : sourceList
    if (this.model.instanceID === sourceList.instanceID) {
      return this.moveItem(sourceItem, targetIndex)
    }
    return this.transferItem(sourceItem, sourceList, targetIndex)
  }
}
