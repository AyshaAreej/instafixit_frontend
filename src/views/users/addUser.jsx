// addUser.js
import React from 'react'
import {
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'

const AddUser = ({ user, roles, onChange }) => {
  return (
    <CForm>
      <div className="mb-3">
        <CFormLabel htmlFor="name">Name</CFormLabel>
        <CFormInput
          type="text"
          id="name"
          name="name"
          placeholder="Enter full name"
          value={user.name || ''}
          onChange={onChange}
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <CFormLabel htmlFor="email">Email</CFormLabel>
          <CFormInput
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={user.email || ''}
            onChange={onChange}
          />
        </div>

        <div className="col-md-6">
          <CFormLabel htmlFor="phone">Phone</CFormLabel>
          <CFormInput
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={user.phone || ''}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <CFormLabel htmlFor="dob">Date of Birth</CFormLabel>
          <CFormInput
            type="date"
            id="dob"
            name="dob"
            value={user.dob || ''}
            onChange={onChange}
          />
        </div>

        <div className="col-md-6">
          <CFormLabel htmlFor="IBAN">IBAN</CFormLabel>
          <CFormInput
            type="text"
            id="IBAN"
            name="IBAN"
            placeholder="Enter IBAN"
            value={user.IBAN || ''}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <CFormLabel htmlFor="userRole">User Role</CFormLabel>
        <CFormSelect
          id="userRole"
          name="userRole"
          value={user.userRole || ''}
          onChange={onChange}
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
    </CForm>
  )
}

export default AddUser
