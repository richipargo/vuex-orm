import Model from '../../model/Model'
import Mutator from '../contracts/Mutator'
import Attribute from '../Attribute'

export default abstract class Type extends Attribute {
  /**
   * The default value of the field.
   */
  value: any

  /**
   * Whether if the attribute can accept `null` as a value.
   */
  isNullable: boolean = false

  /**
   * Whether if the attribute is serializable vie `$toJson` method.
   */
  isSerializable: boolean = true

  /**
   * The mutator for the field.
   */
  mutator?: Mutator<any>

  /**
   * Create a new type instance.
   */
  constructor (model: typeof Model, value: any, mutator?: (value: any) => any) {
    super(model) /* istanbul ignore next */

    this.value = value
    this.mutator = mutator
  }

  /**
   * Set `isSerializable` to `value`.
   */
  serialize (value: boolean = true): this {
    this.isSerializable = value

    return this
  }

  /**
   * Set `isNullable` to be `true`.
   */
  nullable (): this {
    this.isNullable = true

    return this
  }

  /**
   * Mutate the given value by mutator.
   */
  mutate (value: any, key: string): any {
    const mutator = this.mutator || this.model.mutators()[key]

    return mutator ? mutator(value) : value
  }
}
