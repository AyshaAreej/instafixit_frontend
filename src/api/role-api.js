import { headers } from '../constant'
import { getToken } from '../utils/common'
import ApiService from '.'

class RoleApi {
  getRolesApi = async (id) => {
    return ApiService.get(`roles`, {
      ...headers,
        Authorization: `Bearer ${getToken()}`,
    })
      .then((result) => ({
        error: false,
        data: result.data,
      }))
      .catch((err) => ({
        error: true,
        data: err,
      }))
  }
}

export const roleRequests = new RoleApi()
