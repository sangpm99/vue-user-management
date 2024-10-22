import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { VTreeview } from 'vuetify/labs/VTreeview'

export default createVuetify({
    icons: {
        defaultSet: 'mdi'
    },
    components: {
        VTreeview,
    },
})
