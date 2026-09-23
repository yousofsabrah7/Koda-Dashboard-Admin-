import { Pencil, Shield, ShieldCheck, Trash2, UserPlus } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import Search from "../../components/UI/Search";
import Table from "../../components/UI/Table";
import Pagination from "../../components/UI/Pagination";
import Statecard from "../../components/User_components/Statecard";

import {
  useAddUser,
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "../../services/apiHooks/usersHook";

import { selectUser } from "../../redux/services/authSlice";
import Modal from "../../components/UI/Modal";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { useChangeRole } from "../../services/apiHooks/authHook";

const USERS_PER_PAGE = 10;

const Users = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = useSelector(selectUser);

  const { data, isLoading, isError } = useUsers();

  const {
    mutate: addUser,
    isPending: isAddingPending,
    isSuccess: isAddingSuccess,
  } = useAddUser();

  const {
    mutate: updateUser,
    isPending: isUpdatingPending,
    isSuccess: isUpdatingSuccess,
  } = useUpdateUser();
  const {
    mutate: changeRole,
    isPending: isRolePending,
    isSuccess: isRoleSuccess,
  } = useChangeRole();

  const {
    mutate: deleteUser,
    isPending: isDeletingPending,
    isSuccess: isDeletingSuccess,
  } = useDeleteUser();

  const users = data?.users || [];

  const handleSearch = (value) => {
    setSearch(value);

    setPage(1);
  };
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      return (
        user?._id?.toLowerCase().includes(query) ||
        user?.username?.toLowerCase().includes(query) ||
        user?.email?.toLowerCase().includes(query) ||
        user?.role?.toLowerCase().includes(query) ||
        user?.phone?.toLowerCase().includes(query) ||
        String(user?.isVerified).toLowerCase().includes(query) ||
        String(user?.createdAt).toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const startIndex = (page - 1) * USERS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  );

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }

    if (totalPages === 0 && page !== 1) {
      setPage(1);
    }
  }, [page, totalPages]);

  const handleChangeRole = (user) => {
    if (!user?._id) return;
    const newRole = user.role?.toLowerCase() === "admin" ? "customer" : "admin";
    changeRole({
      userId: user?._id,
      role: newRole,
    });
  };
  const handleAddUser = (payload) => {
    addUser(payload);
  };
  const handleEdit = (user) => {
    if (!user?._id) return;

    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    if (!user?._id) return;

    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedUser?._id) return;

    deleteUser(selectedUser._id);
    setTimeout(() => {
      if (isDeletingSuccess) {
        setShowDeleteModal(false);
        setSelectedUser(null);
      }
    }, 500);
  };
  const handleUpdateUser = (payload) => {
    if (!selectedUser?._id) return;

    updateUser({
      id: selectedUser._id,
      payload,
    });
    if (isUpdatingSuccess) {
      setSelectedUser(null);
      setShowEditModal(false);
    }
  };

  const columns = [
    {
      key: "user",
      label: "User",
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "role",
      label: "Role",
    },

    {
      key: "verified",
      label: "Verified",
    },

    {
      key: "phone",
      label: "Phone",
    },

    {
      key: "createdAt",
      label: "Joined",
    },

    {
      key: "actions",
      label: "Actions",
    },
  ];
  const rows = paginatedUsers.map((user) => {
    const isAdmin = user?.role?.toLowerCase() === "admin";

    const canManageUser = currentUser?.email === "admin@E-Hub.com";

    return {
      id: user._id,
      user: (
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-accent-light
              text-accent
              font-semibold
              uppercase
            "
          >
            {user?.username?.charAt(0) || "U"}
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                font-semibold
                text-text-primary
              "
            >
              {user?.username || "Unknown"}
            </p>

            <p
              className="
                truncate
                text-xs
                text-text-muted
              "
            >
              {user?._id}
            </p>
          </div>
        </div>
      ),

      email: <span className="text-text-secondary">{user?.email || "—"}</span>,

      role: (
        <span
          className={`
            inline-flex
            items-center
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold

            ${
              isAdmin
                ? "bg-accent-light text-accent"
                : "bg-surface-elevated text-text-secondary"
            }
          `}
        >
          {user?.role || "Customer"}
        </span>
      ),

      verified: (
        <span
          className={`
            inline-flex
            items-center
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold

            ${
              user?.isVerified
                ? "bg-accent-light text-accent"
                : "bg-surface-elevated text-text-muted"
            }
          `}
        >
          {user?.isVerified ? "Verified" : "Not verified"}
        </span>
      ),
      phone: <span className="text-text-secondary">{user?.phone || "—"}</span>,

      createdAt: (
        <span
          className="
            whitespace-nowrap
            text-text-secondary
          "
        >
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "—"}
        </span>
      ),
      actions: canManageUser ? (
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            title={isAdmin ? "Make Customer" : "Make Admin"}
            disabled={isRolePending}
            onClick={() => handleChangeRole(user)}
            className="
              rounded-lg
              p-2
              text-text-secondary
              transition
              hover:bg-accent-light
              hover:text-accent
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isAdmin ? (
              <ShieldCheck className="text-accent" size={17} />
            ) : (
              <Shield size={17} />
            )}
          </button>

          <button
            type="button"
            title="Edit User"
            onClick={() => handleEdit(user)}
            className="
              rounded-lg
              p-2
              text-text-secondary
              transition
              hover:bg-accent-light
              hover:text-accent
            "
          >
            <Pencil size={17} />
          </button>

          {currentUser?.email !== user?.email ? (
            <button
              type="button"
              title="Delete User"
              disabled={isDeletingPending}
              onClick={() => handleDelete(user)}
              className="
              rounded-lg
              p-2
              text-text-secondary
              transition
              hover:bg-red-500/10
              hover:text-red-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              <Trash2 size={17} />
            </button>
          ) : null}
        </div>
      ) : (
        <span className="text-text-muted">—</span>
      ),
    };
  });

  return (
    <div
      className="
        flex
        flex-col
        items-center
        gap-4
        px-8
        py-6
      "
    >
      <div
        className="
          flex
          w-full
          flex-col
          items-start
          justify-between
          gap-5
          rounded-3xl
          border
          border-border-subtle
          bg-surface-elevated
          p-5

          md:flex-row
          md:items-center
          md:p-8
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-text-primary
            "
          >
            Users
          </h2>
          <p
            className="
              mt-1
              text-sm
              text-text-muted
            "
          >
            Manage users and their permissions
          </p>
        </div>

        <div
          className="
            flex
            flex-col md:flex-row
            w-full
            items-center
            gap-3

            md:w-auto
          "
        >
          <Search onChange={handleSearch} value={search} />

          <button
            type="button"
            onClick={() => setShowAddUser(true)}
            className="
              flex
              items-center
              gap-1
              rounded-xl
              bg-accent
              text-center
              px-5
              py-3
              w-40 max-md:w-full
              text-sm
              text-white
              transition
              hover:bg-accent-hover
            "
          >
            <UserPlus size={18} />
            Add User
          </button>
          <AddUserModal
            showAddUser={showAddUser}
            setShowAddUser={setShowAddUser}
            addUserFn={handleAddUser}
            isAddingPending={isAddingPending}
            isAddingSuccess={isAddingSuccess}
          />
          <EditUserModal
            showEditUser={showEditModal}
            setShowEditUser={setShowEditModal}
            user={selectedUser}
            updateUserFn={handleUpdateUser}
            isUpdating={isUpdatingPending}
          />
        </div>
      </div>

      <div className="w-full">
        <Statecard />
      </div>
      <div
        className="
          w-full
          overflow-hidden
          rounded-3xl
          border
          border-border-subtle
          bg-surface-card
        "
      >
        <Table
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          isError={isError}
        />
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete User"
          description="This action cannot be undone."
          size="sm"
          footer={
            <>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="
                  rounded-xl
                  border
                  border-border-subtle
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-text-secondary
                  hover:bg-surface-elevated
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeletingPending}
                onClick={handleConfirmDelete}
                className="
                  rounded-xl
                  bg-red-500
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Delete
              </button>
            </>
          }
        >
          <div className="text-sm text-text-secondary">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-text-primary">
              {selectedUser?.username}
            </span>
            ?
          </div>
        </Modal>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={page}
          totalPages={totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Users;
