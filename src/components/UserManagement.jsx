import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Table, Button, Container, Alert } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    }
  };

  const handleDeleteUser = useCallback(
    async (userId) => {
      try {
        await axios.delete(`/api/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
        setMessage("User deleted successfully");
        setError(null);
      } catch (error) {
        console.error("Error deleting user:", error);
        setMessage(null);
        setError("Failed to delete user");
      }
    },
    [users]
  );

  const handleRoleChange = useCallback(async (userId, currentRole) => {
    const newRole = currentRole === "Admin" ? "Tenant" : "Admin";
    try {
      await axios.put(`/api/users/${userId}`, { role: newRole });
      fetchUsers(); // Refresh the list after updating the user role
      setMessage(`User role changed to ${newRole} successfully`);
      setError(null);
    } catch (error) {
      console.error(`Error changing user role to ${newRole}:`, error);
      setMessage(null);
      setError(`Failed to change user role to ${newRole}`);
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Actions",
        accessor: "_id",
        disableSortBy: true,
        Cell: ({ row }) => {
          const userId = row.original._id;
          const currentRole = row.original.role;
          return (
            <div>
              {currentRole !== "Owner" && (
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(userId)}
                  className="me-2"
                >
                  Delete
                </Button>
              )}
              {currentRole === "Tenant" && (
                <Button
                  variant="primary"
                  onClick={() => handleRoleChange(userId, currentRole)}
                >
                  Make Admin
                </Button>
              )}
              {currentRole === "Admin" && (
                <Button
                  variant="primary"
                  onClick={() => handleRoleChange(userId, currentRole)}
                >
                  Make Tenant
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [handleDeleteUser, handleRoleChange]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users }, useSortBy);

  return (
    <Container>
      <h2>User Management</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover {...getTableProps()} className="rounded">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

UserManagement.propTypes = {
  value: PropTypes.string,
  row: PropTypes.shape({
    value: PropTypes.string,
    original: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default UserManagement;
