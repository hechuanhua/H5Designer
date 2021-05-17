import { init } from '@rematch/core'
import * as models from './models/selected'

const store = init({
  models,
})

export default store
