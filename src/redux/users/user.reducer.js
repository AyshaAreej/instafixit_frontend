import { UpdateNewUser, UpdateUsers, updateUsersDataTable } from './user.types'

const INITIAL_STATE = {
  users: [],
  newUser: {},
  isAddUserClicked: null,
  usersDataTable: {
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 200,
      },
      {
        label: 'Phone',
        field: 'phone',
        width: 270,
      },
      {
        label: 'Email',
        field: 'email',
        width: 270,
      },
      {
        label: 'Action',
        field: 'action',
        width: 200,
      },
    ],
    rows: [],
  },
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UpdateUsers:
      return {
        ...state,
        users: action.payload,
      }
    case UpdateNewUser:
      return {
        ...state,
        newUser: action.payload,
      }
    case updateUsersDataTable:
      return {
        ...state,
        usersDataTable: action.payload,
      }
    default:
      return state
  }
}

export default reducer
