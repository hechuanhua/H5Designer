import { init } from '@rematch/core'
import * as models from './models/setType'

const store = init({
  models,
})

export default store
