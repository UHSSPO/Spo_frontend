import { initializeAxios } from '~/util/axios'

const accessor = ({ $axios }) => {
  initializeAxios($axios)
}

export default accessor
