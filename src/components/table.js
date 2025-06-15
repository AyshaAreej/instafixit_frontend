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
  handleView = () => {},
}) => {
  const totalPages = meta?.totalPages || 1
  const currentPage = meta?.currentPage || 1

  return (
    <div className="table-container rounded shadow-sm border bg-white p-3">
      <CTable hover responsive className="mb-0 text-center align-middle">
        <CTableHead className="table-light">
          <CTableRow>
            {columns.map((col) => (
              <CTableHeaderCell key={col.field} style={{ minWidth: col.width || '120px' }}>
                {col.label}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <CTableRow
                key={row.id || rowIndex}
                onClick={() => handleView(row.id)}
                style={{ cursor: 'pointer' }}
                className={rowIndex % 2 === 0 ? 'table-row-light' : 'table-row-alt'}
              >
                {columns.map((col) => (
                  <CTableDataCell key={col.field}>
                    {col.field === 'action' ? row[col.field] : row[col.field] ?? ''}
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={columns.length} className="text-center py-4 text-muted">
                No records found.
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      {showPagination && totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <CPagination>
            {Array.from({ length: totalPages }).map((_, index) => (
              <CPaginationItem
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
                style={{ cursor: 'pointer' }}
              >
                {index + 1}
              </CPaginationItem>
            ))}
          </CPagination>
        </div>
      )}
    </div>
  )
}

export default Table
