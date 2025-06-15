import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilPeople } from '@coreui/icons'   // ⬅️ add cilPeople
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/addUser',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,   // ⬅️ use cilPeople
  },
]

export default _nav
