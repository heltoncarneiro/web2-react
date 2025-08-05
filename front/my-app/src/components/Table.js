import React from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import styled from 'styled-components';

// --- Styled Components ---
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    text-align: left;
  }

  thead {
    background-color: #f8fafc;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #f1f5f9;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

/**
 * A reusable Table component built with @tanstack/react-table.
 * @param {object[]} data - The data to display in the table.
 * @param {object[]} columns - The column definitions for the table.
 * @param {object} pagination - The pagination state from the server.
 * @param {function} onPageChange - Callback function to handle page changes.
 */
const Table = ({ data, columns, pagination, onPageChange }) => {
    const table = useReactTable({
        data,
        columns,
        pageCount: pagination?.totalPages ?? -1,
        state: {
            pagination: {
                pageIndex: (pagination?.page ?? 1) - 1,
                pageSize: 10, // Or get from pagination object if available
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newPaginationState = updater(table.getState().pagination);
                onPageChange(newPaginationState.pageIndex + 1);
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
    });

    return (
        <>
            <TableWrapper>
                <StyledTable>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableWrapper>
            <PaginationContainer>
                <PaginationButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Anterior
                </PaginationButton>
                <span>
                    Página{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </strong>
                </span>
                <PaginationButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Próxima
                </PaginationButton>
            </PaginationContainer>
        </>
    );
};

export default Table;
