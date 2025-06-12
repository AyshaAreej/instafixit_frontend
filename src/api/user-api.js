import { headers } from '../constant'
import { getToken } from '../utils/common'
import ApiService from '.'

class UserApi {
  addUserApi = async (data) => {
    return ApiService.post('user', data, {
      ...headers,
      // Authorization: `Bearer ${getToken()}`,
    })
      .then((result) => ({
        error: false,
        data: result.data,
      }))
      .catch((err) => {
        console.log('User Error', JSON.stringify(err))
        return {
          error: true,
          data: err,
        }
      })
  }
   getUsersApi = async (page,limit) => {
    return ApiService.get(`user`+`?page=${page}&limit=${limit}`, {
      ...headers,
      // Authorization: `Bearer ${getToken()}`,
    })
      .then((result) => {
        return {
          error: false,
          data: result.data,
        };
      })
      .catch((err) => {
        return {
          error: true,
          data: err,
        };
      });
  };

  deleteUserApi = async (id) => {
    return ApiService.delete(`user/${id}`, {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    })
      .then((result) => ({
        error: false,
        data: result.data,
      }))
      .catch((err) => {
        console.log('Delete User Error', JSON.stringify(err))
        return {
          error: true,
          data: err,
        }
      })
  }

  getUserByIdApi = async (id) => {
    return ApiService.get(`user/${id}`, {
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

  updateUserApi = async (id, data) => {
    return ApiService.put(`user/${id}`, data, {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    })
      .then((result) => ({
        error: false,
        data: result.data,
      }))
      .catch((err) => {
        console.log('Update User Error', JSON.stringify(err))
        return {
          error: true,
          data: err,
        }
      })
  }
}

export const userRequests = new UserApi()
