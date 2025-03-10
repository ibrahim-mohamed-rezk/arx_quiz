"use client";

import { getData } from "@/libs/axios/backend";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Winner {
  id: number;
  name: string;
  phone: string;
  correct_answers: number;
}

const Table = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [winner, setWinner] = useState<Winner | null>(null);

  const fetchUsers = async () => {
    const response = await getData("perfect-customers");
    const data = await response.customers;
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await getData(`delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  //   search in users by name

  useEffect(() => {
    if (!searchQuery) {
      fetchUsers();
      return;
    }
    const filteredUsers = users.filter((user: Winner) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsers(filteredUsers);
  }, [searchQuery]);

  const handleGetWinner = async () => {
    const response = await getData("winner");
    const data = await response.winner;
    setWinner(data);
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-start relative bg-[#2a2a2a] overflow-hidden`}
    >
      <div
        className={`flex items-center justify-start flex-col mt-[120px] z-50 `}
      >
        {/* splash */}
        <div
          className={`flex items-center justify-center flex-col duration-[1s]  `}
        >
          <Image
            className={`duration-[1s] `}
            width={101}
            height={85}
            src="/images/logo.svg"
            alt="logo"
          />
        </div>
      </div>

      {/* search */}
      <div className="w-[80%] mx-auto mt-[50px] flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[30%] p-2 border border-gray-600 rounded-2xl bg-[#2A2A2A] text-white focus:outline-none"
        />
        <button
          onClick={handleGetWinner}
          className="bg-[#e1a12c] cursor-pointer text-[18px] font-bold w-[30%] px-4 py-2 rounded-2xl text-white"
        >
          اختيار فائز
        </button>
      </div>

      {/* table  */}
      <table className="w-[90%] mx-auto mt-[50px] rounded-2xl overflow-hidden bg-[#2A2A2A] border-collapse text-center">
        <thead>
          <tr className="bg-[#2A2A2A]">
            <th className="py-2 px-4 border border-gray-600 text-white">ID</th>
            <th className="py-2 px-4 border border-gray-600 text-white">
              Name
            </th>
            <th className="py-2 px-4 border border-gray-600 text-white">
              Phone
            </th>
            <th className="py-2 px-4 border border-gray-600 text-white">
              Correct Answers
            </th>
            <th className="py-2 px-4 border border-gray-600 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: Winner) => (
            <tr key={user.id} className="hover:bg-[##2A2A2A]">
              <td className="py-2 px-4 border border-gray-600 text-gray-300">
                {user.id}
              </td>
              <td className="py-2 px-4 border border-gray-600 text-gray-300">
                {user.name}
              </td>
              <td className="py-2 px-4 border border-gray-600 text-gray-300">
                {user.phone}
              </td>
              <td className="py-2 px-4 border border-gray-600 text-gray-300">
                {user.correct_answers || 0}
              </td>
              <td className="py-2 px-4 border border-gray-600 text-gray-300">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* winner popup */}
      {winner && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setWinner(null)}
        >
          <div
            className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 shadow-2xl max-w-md w-[420px] h-[420px] flex items-center justify-center flex-col border border-yellow-600/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 w-full">
              <h2 className="text-2xl font-bold text-yellow-500">🏆 Winner!</h2>
              <button
                className="text-gray-400 hover:text-yellow-500 transition-colors"
                onClick={() => setWinner(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mb-6 w-full bg-black/40 p-5 rounded-xl border border-[##2A2A2A]">
              <p className="text-gray-300 mb-3 flex justify-between">
                <span>Name:</span>
                <span className="font-semibold text-white">{winner.name}</span>
              </p>
              <p className="text-gray-300 mb-3 flex justify-between">
                <span>Phone:</span>
                <span className="font-semibold text-white">{winner.phone}</span>
              </p>
              <p className="text-gray-300 flex justify-between">
                <span>Correct Answers:</span>
                <span className="font-semibold text-yellow-400">
                  {winner.correct_answers || 0}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* absolute vectors */}
      <div
        className={`absolute top-[-100px] scale-[1.5] left-[-100px] z-0 duration-[1s] origin-top-left `}
      >
        <Image
          width={300}
          height={100}
          src="/images/leftVector.svg"
          alt="vector"
        />
      </div>

      <div
        className={`absolute bottom-[-100px] scale-[1.5] right-[-100px] z-0 duration-[1s] origin-bottom-right `}
      >
        <Image
          width={300}
          height={100}
          src="/images/rightVector.svg"
          alt="vector"
        />
      </div>
    </div>
  );
};

export default Table;
