import React, { useEffect, useMemo, useState } from 'react'

import { useTable, useGroupBy, useExpanded } from 'react-table'
import groupIcon from '../../../Asset/Icon/group.svg';
import groupedIcon from '../../../Asset/Icon/grouped.svg';

export const TableComponent = props => {
  const {
    columns,
  } = props;
  const [data, setData] = useState([])
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setData(props.data || [])
  }, [props.data])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { groupBy, expanded },
  } = useTable({
    columns,
    data,
  },
    useGroupBy,
    useExpanded
  )

  // Render the UI for your table
  return (
    <div className = "table-container">
      <table {...getTableProps()} className="custom-table">
        <thead className="thead">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {/* {column.render('Header')} */}
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? <img src={groupedIcon}/> : <img src={groupIcon} />}
                    </span>
                  ) : null}
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              // <tr {...row.getRowProps()}>
              //   {row.cells.map(cell => {
              //     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              //   })}
              // </tr>
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        background: cell.isGrouped
                          ? '#FBF3F2  '
                          : cell.isAggregated
                            ? '#FDF6E5'
                            : cell.isPlaceholder
                              ? '#E7F4EB'
                              : 'white',
                      }}
                    >
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
