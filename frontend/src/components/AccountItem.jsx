import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../features/transactions/transactionSlice";
import { deleteAccount } from "../features/accounts/accountSlice";
import { toast } from "react-toastify";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function AccountItem({ account }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [accountBalance, setAccountBalance] = useState(account.balance);

  const withdrawHandler = () => {
    dispatch(
      createTransaction({
        transaction_amount: amount,
        transaction_type: "withdrawal",
        account_id: account._id,
      })
    );
    if (amount > account.balance) {
      toast.error("You don't have enough money in your account to withdraw ");
    } else if (amount <= 0) {
      toast.error("Amount must be greater than 0");
    } else {
      toast.success("Withdrawal successful");
      if (accountBalance) {
        setAccountBalance(accountBalance - amount);
        setAmount(0);
      }
    }
  };

  const transferHandler = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8080/api/transactions/create-transaction",
      {
        transaction_amount: amount,
        transaction_type: "transfer",
        account_id: account._id,
        transfer_to: document.getElementById("transfer_to").value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (amount > account.balance) {
      toast.error("You don't have enough money in your account to withdraw ");
    } else if (amount <= 0) {
      toast.error("Amount must be greater than 0");
    } else {
      toast.success("Transfer successful");
      if (accountBalance) {
        setAccountBalance(accountBalance - amount);
        setAmount(0);
      }
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios.get(
        "http://localhost:8080/api/accounts/get-all-accounts",
        config
      );

      // filter the current account from the select options

      const filteredAccounts = res.data.filter(
        (accountItem) => accountItem._id !== account._id
      );
      setAccounts(filteredAccounts);
    };
    fetchAccounts();
  }, [dispatch, account._id]);

  return (
    // <div className="account  ">
    //   <h2 className="font-bold text-center">
    //     Account name:{" "}
    //     <span className="text-base font-light mb-2">{account.name}</span>
    //   </h2>
    //   <h2 className="font-bold text-center">
    //     Account balance:{" "}
    //     <span className="text-base font-light mb-2">{account.balance} DH </span>
    //   </h2>

    //   <div className="flex justify-center gap-3">
    //     <button
    //       onClick={() => dispatch(deleteAccount(account._id))}
    //       className="close inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
    //     >
    //       Delete Account
    //     </button>
    //     <input
    //       className="account-input border-solid border py-1 px-2 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    //       type="number"
    //       name="amount"
    //       value={amount}
    //       onChange={(e) => setAmount(e.target.value)}
    //     />
    //     <button
    //       className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
    //       onClick={withdrawHandler}
    //     >
    //       Withdraw
    //     </button>
    //     <button
    //       className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
    //       onClick={transferHandler}
    //     >
    //       Transfer to
    //     </button>
    //   </div>
    //   <div className="flex justify-center">
    //     <div className="mb-3 xl:w-96">
    //       <select
    //         className="m-2 block w-full px-3 py-1.5 text-base font-normaltext-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    //         id="transfer_to"
    //       >
    //         <option value="">Select an account</option>
    //         {accounts.map((account) => (
    //           <option key={account._id} value={account._id}>
    //             {account.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   </div>
    // </div>
    <div className="p-4 items-center justify-center w-[680px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl mt-10">
      <div className="sm pl-0 p-5">
        <div className="space-y-2">
          <div className="space-y-4 flex justify-center">
            <h4 className="text-md font-light text-cyan-900 text-justify">
              Account name: {account.name}
            </h4>
          </div>
          <div className="space-y-4 flex justify-center">
            <h4 className="text-md font-light text-cyan-900 text-justify">
              Account balance: {accountBalance} DH
            </h4>
          </div>
          <div className="flex items-center space-x-4 justify-between">
            <input
              className="account-input border-solid border py-1 px-2 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              className="m-2 block  px-3 py-1.5 text-base font-normaltext-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="transfer_to"
            >
              <option value="">Select an account</option>
              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.name}
                </option>
              ))}
            </select>
            <div className=" px-3 py-1 rounded-lg flex space-x-2 flex-row">
              <div className="cursor-pointer text-center text-xs justify-center items-center flex">
                <ArrowDownwardIcon />
                <button
                  // className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={withdrawHandler}
                >
                  Withdraw
                </button>
              </div>
              <div className="cursor-pointer text-center text-xs justify-center items-center flex">
                <ArrowUpwardIcon />
                <button
                  // className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={transferHandler}
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center">
            <div className="">
              <div className="bg-red-500 shadow-lg shadow- shadow-red-600 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row">
                <button onClick={() => dispatch(deleteAccount(account._id))}>
                  Delete Account
                </button>
              </div>
              {/* <div className="bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row">
                <button
                  onClick={() => dispatch(deleteAccount(account._id))}
                >
                  Delete Account
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountItem;
