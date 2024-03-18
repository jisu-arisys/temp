import Card from './components/Cards/Card.vue'

import BaseInput from './components/Inputs/BaseInput.vue'
import BaseCheckbox from './components/Inputs/BaseCheckbox.vue'
import BaseRadio from './components/Inputs/BaseRadio.vue'
import TimeRadio from './components/Inputs/TimeRadio.vue'

import BaseDropdown from './components/BaseDropdown.vue'

import LTable from './components/Table.vue'
import UTable from './components/Tables/TableUpdateDelete.vue'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component(Card.name, Card)
    Vue.component(BaseInput.name, BaseInput)
    Vue.component(BaseCheckbox.name, BaseCheckbox)
    Vue.component(BaseRadio.name, BaseRadio)
    Vue.component(TimeRadio.name, TimeRadio)
    Vue.component(BaseDropdown.name, BaseDropdown)
    Vue.component(LTable.name, LTable)
    Vue.component(UTable.name, UTable)
  }
}

export default GlobalComponents
