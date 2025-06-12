import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CForm,
  CButton,
} from '@coreui/react'
import { updateNewUserAction, updateUsersAction } from '../../redux/users/user.action'
import { userRequests } from '../../api/user-api'
import { toast } from 'react-toastify'
import { roleRequests } from '../../api/role-api'

const AddUser = ({ id, refreshData }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.users)
  const [roles, setRoles] = useState([])

  // const roles = ['Admin', 'Provider', 'Customer']
  useEffect(() => {
    getRoles()
  }, [])

  const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'userRole') {
    const selectedRole = roles.find((role) => role.name === value);
    dispatch(updateNewUserAction({ ...state.newUser, [name]: selectedRole?.name }));
  } else {
    dispatch(updateNewUserAction({ ...state.newUser, [name]: value }));
  }
};

  const getRoles = async () => {
    const res = await roleRequests.getRolesApi()
    console.log('roles', res)
    if (!res.error) {
      setRoles(res.data)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        name: state.newUser.name,
        email: state.newUser.email,
        phone: state.newUser.phone,
        dob: state.newUser.dob,
        role: state.newUser.userRole,
        iban: state.newUser.iban,
      }

      const res = await userRequests.addUserApi(payload)
      if (!res.error) {
        toast.success('User added successfully!')
        dispatch(updateNewUserAction({}))
      }
    } catch (error) {
      toast.error(error.response?.data?.message?.[0] || 'Error adding user')
      console.error(error)
    }
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>{id ? 'Edit User' : 'Add New User'}</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={state?.newUser?.name || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={state?.newUser?.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="phone">Phone</CFormLabel>
            <CFormInput
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={state?.newUser?.phone || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="dob">Date of Birth</CFormLabel>
            <CFormInput
              type="date"
              id="dob"
              name="dob"
              value={state?.newUser?.dob || ''}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="iban">IBAN</CFormLabel>
            <CFormInput
              type="text"
              id="iban"
              name="iban"
              placeholder="Enter IBAN"
              value={state?.newUser?.iban || ''}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="role">User Role</CFormLabel>
            <CFormSelect
              id="userRole"
              name="userRole"
              value={state?.newUser?.userRole || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </CFormSelect>
          </div>

          <CButton type="submit" color="primary">
            {id ? 'Update User' : 'Add User'}
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AddUser
