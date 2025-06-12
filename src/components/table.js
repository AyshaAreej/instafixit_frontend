// components/CoreUITable.js
import React from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const Table = ({
  columns = [],
  rows = [],
  meta = {},
  showPagination = true,
  handlePageChange = () => {},
  headerStyle = {},
  bodyStyle = {},
  handleView = () => {},
}) => {
  const totalPages = meta?.totalPages || 1
  const currentPage = meta?.currentPage || 1

  return (
    <>
      <CTable hover responsive bordered align="middle">
        <CTableHead>
          <CTableRow style={headerStyle}>
            {columns.map((col) => (
              <CTableHeaderCell key={col.field} style={{ minWidth: col.width || '120px' }}>
                {col.label}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {rows.map((row, rowIndex) => (
            <CTableRow key={row.id || rowIndex} onClick={() => handleView(row.id)}>
              {columns.map((col) => (
                <CTableDataCell key={col.field} style={bodyStyle}>
                  {col.field === 'action' ? row[col.field] : row[col.field] ?? ''}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {showPagination && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination align="center">
            {Array.from({ length: totalPages }).map((_, index) => (
              <CPaginationItem
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
          </CPagination>
        </div>
      )}
    </>
  )
}

export default Table
