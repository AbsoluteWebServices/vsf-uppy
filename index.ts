import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { uppyModule } from './store'

export const KEY = 'uppy'
const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module: uppyModule }] },
}

export const Uppy = new VueStorefrontModule(moduleConfig)
