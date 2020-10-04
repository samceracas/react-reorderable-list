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
   * Transfers an item from one list to another or reorders the items if the ```sourceList``` is null.
   *
   * @param {ListItem} sourceItem
   * @param {List} sourceList
   * @param {Number} targetIndex
   * @memberof ListController
   */
  updateList(sourceItem, targetIndex, sourceList = null, callback = null) {
    let targetList = [...this.model.listData]
    sourceList = !sourceList ? this.model : sourceList

    const itemData = sourceItem.data
    const itemIndex = sourceItem.index

    const sourceListPath = sourceList.path
    const onListUpdate = callback?.onListUpdate
    const onListGroupUpdate = callback?.onListGroupUpdate

    if (this.model.instanceID === sourceList.instanceID) {
      targetList = arrayMove(targetList, itemIndex, targetIndex)
      let params = [targetList, this.model.path]
      if (this.model.group) {
        const groupCopy = [...this.model.group]
        set(this.model.path, groupCopy, targetList)
        params = [groupCopy]
      }
      onListUpdate?.apply(this, params)
    } else {
      const sourceListData = sourceList.listData.filter(
        (item, index) => index !== itemIndex
      )
      targetList.push(itemData)
      targetList = arrayMove(targetList, targetList.length - 1, targetIndex)
      const toUpdate = [
        {
          path: sourceListPath,
          list: sourceListData
        },
        {
          path: this.model.path,
          list: targetList
        }
      ]
      if (this.model.group) {
        const groupCopy = [...this.model.group]
        toUpdate.forEach((data) => set(data.path, groupCopy, data.list))
        onListUpdate?.call(this, groupCopy)
      } else {
        onListGroupUpdate?.call(this, toUpdate)
      }
    }
  }
}
