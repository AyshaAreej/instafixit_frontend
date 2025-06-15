import React, { useEffect, useState } from 'react'
import { userRequests } from '../../api/user-api'
import { roleRequests } from '../../api/role-api'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUsersDataTableAction,
  updateNewUserAction,
} from '../../redux/users/user.action'
import Table from '../../components/table'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import AddUser from './addUser'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'

const Index = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.users)
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [editId, setEditId] = useState('')
  const [roles, setRoles] = useState([])

  useEffect(() => {
    getUsers(1)
    fetchRoles()
  }, [])

  const getUsers = async (page) => {
    try {
      setLoading(true)
      const res = await userRequests.getUsersApi(page, 100)

      if (!res.error) {
        setMeta(res?.data?.meta)
        const tempArr = res?.data?.items?.map((x) => ({
          ...x,
          action: (
            <EditIcon
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={() => handleEdit(x)}
            />
          ),
        }))
        const tempObj = { ...state.usersDataTable, rows: tempArr }
        dispatch(updateUsersDataTableAction(tempObj))
      }
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRoles = async () => {
    const res = await roleRequests.getRolesApi()
    if (!res.error) {
      setRoles(res.data)
    }
  }

  const refreshData = () => {
    setEditId('')
    setVisible(false)
    getUsers(1)
  }

  const openAddUserModal = () => {
    dispatch(updateNewUserAction({}))
    setEditId('')
    setVisible(true)
  }

  const handleEdit = async (x) => {
    setEditId(x?.id)
    const res = await userRequests.getUserByIdApi(x?.id)
    if (!res.error) {
      const user = res.data
      dispatch(
        updateNewUserAction({
          ...user,
          userRole: user?.userRoles?.[0]?.role?.name || '',
        })
      )
      setVisible(true)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const newValue =
      name === 'userRole'
        ? roles.find((role) => role.name === value)?.name || ''
        : value
    dispatch(updateNewUserAction({ ...state.newUser, [name]: newValue }))
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        name: state.newUser.name,
        email: state.newUser.email,
        phone: state.newUser.phone,
        dob: state.newUser.dob,
        role: state.newUser.userRole,
        iban: state.newUser.IBAN,
      }

      const res = editId
        ? await userRequests.updateUserApi(editId, payload)
        : await userRequests.addUserApi(payload)

      if (!res.error) {
        toast.success(`User ${editId ? 'updated' : 'added'} successfully!`)
        refreshData()
      }
    } catch (error) {
      toast.error(error.response?.data?.message?.[0] || 'Submission failed')
    }
  }

  return (
    <>
      <div className="mb-3 text-end">
        <CButton color="primary" onClick={openAddUserModal}>
          Add User
        </CButton>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={state.usersDataTable?.columns || []}
          rows={state.usersDataTable?.rows || []}
          meta={meta}
          handlePageChange={(page) => getUsers(page)}
          showPagination={true}
          handleView={(id) => console.log('view user', id)}
        />
      )}

      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>{editId ? 'Edit User' : 'Add User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <AddUser
            user={state.newUser}
            roles={roles}
            onChange={handleChange}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            {editId ? 'Update User' : 'Add User'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Index
