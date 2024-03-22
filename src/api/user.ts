import ApiUtil from '~/util/ApiUtil'

export const getMyInfo = () => ApiUtil.get('/user/my', {})
