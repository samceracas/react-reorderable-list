import cryptoRandomString from 'crypto-random-string'

/**
 * A model representing our list item.
 *
 * @export
 * @class ListItem
 * @author Ezequiel Sam Ceracas
 * @version 1.1.0
 */
export default class ListItem {
  /**
   * Creates an instance of ListItem.
   * @param {*} props
   * @memberof ListItem
   */
  constructor(props) {
    this._itemIndex = props.itemIndex || 0
    this._itemData = props.itemData || null
    // @todo
    this._isEnabled = props.enabled || true
    this._removeByDragging = props.removeByDragging || false
    this._instanceID =
      'item-instance-' +
      (props._instanceID
        ? props._instanceID
        : cryptoRandomString({ length: 8 }))
  }

  /**
   * Returns the instance id for this item.
   *
   * @type {String}
   * @readonly
   * @memberof ListItem
   */
  get instanceID() {
    return this._instanceID
  }

  /**
   * Returns the data for this item.
   *
   * @type {Object}
   * @readonly
   * @memberof ListItem
   */
  get data() {
    return this._itemData
  }

  /**
   * Returns a flag which indicates if an item is enabled/disabled.
   *
   * @memberof ListItem
   */
  get enabled() {
    return this._isEnabled
  }

  /**
   * Returns the index for this item on the list.
   *
   * @type {Number}
   * @readonly
   * @memberof ListItem
   */
  get index() {
    return this._itemIndex
  }

  /**
   * Sets the data for this item.
   *
   * @type {Object}
   * @memberof ListItem
   */
  set data(value) {
    this._itemData = value
  }

  /**
   * Sets the index for this item on the list.
   *
   * @type {Number}
   * @memberof ListItem
   */
  set index(value) {
    this._itemIndex = value
  }

  /**
   * Enables/disables the item.
   *
   * @memberof ListItem
   */
  set enabled(value) {
    this._isEnabled = value
  }
}
