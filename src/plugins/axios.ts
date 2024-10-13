import axios from 'axios'
import { useUserData } from '@/composables/useUserData'

axios.defaults.baseURL = 'https://awpdzgxxlkzbkrijwsej.supabase.co/rest/v1'

export default axios
