import React, { useState, useEffect, use } from 'react'
import { Layout } from '../layout/Layout'
import { FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';
import { toast, ToastContainer } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);
      const user = JSON.parse(localStorage.getItem('user:detail') || '{}');
  const email = user.email || "User";
    const fetchUsers = async () => {
        try {
            setTimeout(async () => {
                const res = await fetch(`http://localhost:5000/data/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch users data");
                }

                const resData = await res.json();
                setUsers(resData.map(user => ({ ...user, modified: false })));
            }, 100);
        } catch (error) {
            console.error("Error fetching patients data:", error);
            setUsers([]);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedUsers = [...users];
        updatedUsers[index] = { ...updatedUsers[index], [field]: value ,
              modified: true 
        };
        setUsers(updatedUsers);
    };

    const handleDelete = (UserId) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    className: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
                    onClick: async () => {
                        try {
                            const res = await fetch(`http://localhost:5000/data/user/${UserId}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },

                            });

                            if (res.ok) {
                                toast.success('User deleted successfully!');
                                setUsers(prevUsers => prevUsers.filter(user => user.UserId !== UserId));
                            } else {
                                toast.error('Failed to delete user');
                            }
                        } catch (error) {
                            console.error('Error deleting user:', error);
                        }
                    }
                },
                {
                    label: 'No',
                    className: 'bg-[var(--primary-color))] text-white px-4 py-2 rounded hover:bg-blue-200',
                    onClick: () => { }
                }
            ]
        });
    };

    const handleAllUserDelete = () => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this user?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const res = await fetch(`http://localhost:5000/data/users`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },

                            });

                            if (res.ok) {
                                toast.success('Users deleted successfully!');
                                setUsers([]);
                            } else {
                                toast.error('Failed to delete users');
                            }
                        } catch (error) {
                            console.error('Error deleting users:', error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const handleSave = async () => {
    const modifiedUsers = users.filter(user => user.modified);
    if (modifiedUsers.length === 0) {
        toast.info("No changes to update.");
        return;
    }

    try {
        for (const user of modifiedUsers) {
            const res = await fetch(`http://localhost:5000/data/user/${user.UserId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: user.fullname,
                    phone: user.phone,
                    email: user.email,
                    role: user.role,
                    department: user.department,
                    modifiedBy: email
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to update user with ID ${user.UserId}`);
            }
        }

        toast.success("Updated successfully!");
        setUsers(prev => prev.map(u => ({ ...u, modified: false }))); // reset modified flags
    } catch (err) {
        console.error("Error updating users:", err);
        toast.error("Failed to update some users.");
    }
};



    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <Layout>
            <div className="p-4 bg-white rounded shadow">
                <div className="flex items-center justify-between mb-4">

                    <div className="w-[2rem]" />
                    <h2 className="text-lg font-bold text-center flex-1 text-[var(--primary-color)]">
                        Users Detail
                    </h2>
                    <div className="flex gap-2  text-xl">
                        <FaRegSave className="cursor-pointer text-gray-600 hover:text-[var(--primary-color)]" onClick={() => handleSave()} />
                        <MdDeleteOutline className="cursor-pointer text-gray-600 hover:text-[var(--primary-color)]" onClick={() => handleAllUserDelete()} />
                    </div>

                </div>

                <div className="overflow-x-auto md:overflow-x-scroll lg:overflow-x-scroll">
                    <table className="w-full border-collapse border-gray-400 border min-w-[600px]">
                        <thead className="bg-gray-100 border-gray-400">
                            <tr className=''>
                                <th className="border border-gray-400 text-[var(--primary-color)] p-2">S.N.</th>
                                <th className="border border-gray-400 text-[var(--primary-color)] p-2">Full Name</th>
                                <th className="border border-gray-400 text-[var(--primary-color)] p-2">Email</th>
                                <th className="border border-gray-400 text-[var(--primary-color)] p-2">Role</th>
                                <th className="border border-gray-400 text-[var(--primary-color)] p-2">Department</th>
                                <th className="border border-gray-400 text-[var(--primary-color)] p-2">Phone</th>
                                <th className="border border-gray-400 text-[var(--primary-color)] p-2">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-400 p-2">
                                        <input
                                            type="text"
                                            value={user.fullname}
                                            onChange={(e) => handleChange(index, 'fullname', e.target.value)}
                                            className="w-full p-1  rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-400 p-2">
                                        <input
                                            type="text"
                                            value={user.email}
                                            onChange={(e) => handleChange(index, 'email', e.target.value)}
                                            className="w-full p-1  rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-400 p-2">
                                        <input
                                            type="text"
                                            value={user.role}
                                            onChange={(e) => handleChange(index, 'role', e.target.value)}
                                            className="w-full p-1  rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-400 p-2">
                                        <input
                                            type="text"
                                            value={user.department}
                                            onChange={(e) => handleChange(index, 'department', e.target.value)}
                                            className="w-full p-1  rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-400 p-2">
                                        <input
                                            type="text"
                                            value={user.phone}
                                            onChange={(e) => handleChange(index, 'phone', e.target.value)}
                                            className="w-full p-1  rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-400 p-2 text-center">
                                        <MdDeleteOutline size={20} className="cursor-pointer text-gray-600 hover:text-[var(--primary-color)]"
                                            onClick={() => handleDelete(user.UserId)} /></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer position="top-center" autoClose={1500} />

            </div>    </Layout>
    )
}

export default Users
