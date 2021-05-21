import { init } from '@rematch/core'
import * as models from './models/index'
// import * as setLibrary from './models/setLibrary'
const store = init({
  models
})

export default store
