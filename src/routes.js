import React from 'react'
import ProtectedRoute from './views/pages/ProtectedRoute'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AddUser = React.lazy(() => import('./views/users/index'))

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: (
      <ProtectedRoute roles={['admin', 'provider']}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/addUser',
    name: 'User',
    element: (
      <ProtectedRoute roles={['admin']}>
        <AddUser />
      </ProtectedRoute>
    ),
  },
];


export default routes
