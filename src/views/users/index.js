import React, { useEffect, useState } from 'react'
import { userRequests } from '../../api/user-api'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsersAction, updateUsersDataTableAction } from '../../redux/users/user.action'
import Table from '../../components/table'

const Index = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.users)
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(true)

 useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    try {
      setLoading(true)
      const res = await userRequests.getUsersApi(page, 100)

      if (res.error === false) {
        console.log("res",res.data)
        const userData = res?.data?.items
        dispatch(updateUsersAction(userData))
        setMeta(res?.data?.meta)

        const tempObj = {
          columns: state?.usersDataTable?.columns || [], // Use fallback
          rows: userData,
        }

        dispatch(updateUsersDataTableAction(tempObj))
      }
    } catch (err) {
      console.error('Failed to fetch users:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          columns={state.usersDataTable?.columns || []}
          rows={state.usersDataTable?.rows || []}
          meta={meta}
          handlePageChange={(page) => console.log('view user', view)}
          showPagination={true}
          handleView={(id) => console.log('view user', id)}
        />
      )}
    </>
  )
}

export default Index
