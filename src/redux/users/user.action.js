import { UpdateNewUser, UpdateUsers, updateUsersDataTable } from "./user.types";

export const updateUsersAction = (params) => {
    return {
        type: UpdateUsers,
        payload: params,
    };
};
export const updateUsersDataTableAction = (params) => {
    return {
      type: updateUsersDataTable,
      payload: params
    };
  };
  export const updateNewUserAction = (params) => {
    return {
      type: UpdateNewUser,
      payload: params
    };
  };
