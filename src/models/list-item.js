import cryptoRandomString from 'crypto-random-string'

/**
 * A model representing our list item.
 *
 * @export
 * @class ListItem
 * @author Ezequiel Sam Ceracas
 * @version 1.0.0
 */
export default class ListItem {
  static _defaults = {
    itemIndex: 0,
    itemData: null
  }

  /**
   * Creates an instance of ListItem.
   * @param {*} props
   * @memberof ListItem
   */
  constructor(props) {
    props = { ...ListItem._defaults, ...props }
    this._itemIndex = props.itemIndex
    this._itemData = props.itemData
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
}
