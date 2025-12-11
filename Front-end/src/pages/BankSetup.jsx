import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bankAPI } from '../services/api';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';
import { FaWallet, FaUniversity, FaKey, FaPlus, FaMoneyBillWave } from 'react-icons/fa';

const BankSetup = () => {
  const { user, updateUser } = useAuth();
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [loading, setLoading] = useState(false);

  const [accountData, setAccountData] = useState({
    accountNumber: '',
    secretKey: '',
  });

  const [balanceData, setBalanceData] = useState({
    balance: '',
    secretKey: '',
  });

  useEffect(() => {
    if (!user?.accountNumber) {
      setShowAddAccount(true);
    }
  }, [user]);

  const handleAddAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await bankAPI.addBankAccount(accountData);
      updateUser(response.data.data);
      toast.success('Bank account added successfully!');
      setShowAddAccount(false);
      setAccountData({ accountNumber: '', secretKey: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add bank account');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBalance = async (e) => {
    e.preventDefault();
    
    if (parseFloat(balanceData.balance) <= 0) {
      toast.error('Balance must be greater than 0');
      return;
    }

    setLoading(true);

    try {
      const response = await bankAPI.addBalance(balanceData);
      updateUser(response.data.data);
      toast.success('Balance added successfully!');
      setShowAddBalance(false);
      setBalanceData({ balance: '', secretKey: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add balance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Bank Account Management</h1>

        {/* Current Balance Card */}
        <div className="card mb-8 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-lg mb-2">Current Balance</p>
              <p className="text-5xl font-bold">৳{user?.balance || 0}</p>
              {user?.accountNumber && (
                <p className="text-primary-100 mt-4">
                  <FaUniversity className="inline mr-2" />
                  Account: {user.accountNumber}
                </p>
              )}
            </div>
            <FaWallet className="text-8xl opacity-20" />
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {!user?.accountNumber ? (
            <div className="card bg-yellow-50 border-2 border-yellow-300">
              <FaUniversity className="text-4xl text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Set Up Bank Account
              </h3>
              <p className="text-gray-600 mb-4">
                You need to set up your bank account first to enable transactions.
              </p>
              <button
                onClick={() => setShowAddAccount(true)}
                className="btn-primary w-full"
              >
                <FaPlus className="inline mr-2" />
                Add Bank Account
              </button>
            </div>
          ) : (
            <div className="card bg-green-50 border-2 border-green-300">
              <FaMoneyBillWave className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Add Balance
              </h3>
              <p className="text-gray-600 mb-4">
                Add money to your account to purchase courses.
              </p>
              <button
                onClick={() => setShowAddBalance(true)}
                className="btn-primary w-full bg-green-500 hover:bg-green-600"
              >
                <FaPlus className="inline mr-2" />
                Add Balance
              </button>
            </div>
          )}

          <div className="card bg-blue-50 border-2 border-blue-300">
            <FaKey className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Security
            </h3>
            <p className="text-gray-600 mb-4">
              Your secret key is encrypted and secure. Never share it with anyone.
            </p>
            <div className="text-sm text-blue-700 font-semibold">
              🔒 Bank details are encrypted
            </div>
          </div>
        </div>

        {/* Add Account Modal */}
        {showAddAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add Bank Account
              </h2>
              <form onSubmit={handleAddAccount} className="space-y-5">
                <div>
                  <label className="label">
                    <FaUniversity className="inline mr-2" />
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={accountData.accountNumber}
                    onChange={(e) =>
                      setAccountData({ ...accountData, accountNumber: e.target.value })
                    }
                    className="input-field"
                    placeholder="Enter account number"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <FaKey className="inline mr-2" />
                    Secret Key (Password)
                  </label>
                  <input
                    type="password"
                    value={accountData.secretKey}
                    onChange={(e) =>
                      setAccountData({ ...accountData, secretKey: e.target.value })
                    }
                    className="input-field"
                    placeholder="Enter secret key"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be used to authorize transactions
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Account'}
                  </button>
                  {user?.accountNumber && (
                    <button
                      type="button"
                      onClick={() => setShowAddAccount(false)}
                      className="flex-1 btn-outline"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Balance Modal */}
        {showAddBalance && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add Balance
              </h2>
              <form onSubmit={handleAddBalance} className="space-y-5">
                <div>
                  <label className="label">
                    <FaMoneyBillWave className="inline mr-2" />
                    Amount (৳)
                  </label>
                  <input
                    type="number"
                    value={balanceData.balance}
                    onChange={(e) =>
                      setBalanceData({ ...balanceData, balance: e.target.value })
                    }
                    className="input-field"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <FaKey className="inline mr-2" />
                    Secret Key
                  </label>
                  <input
                    type="password"
                    value={balanceData.secretKey}
                    onChange={(e) =>
                      setBalanceData({ ...balanceData, secretKey: e.target.value })
                    }
                    className="input-field"
                    placeholder="Enter your secret key"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Add Balance'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddBalance(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transaction History Placeholder */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recent Transactions
          </h2>
          <div className="text-center py-12 text-gray-500">
            <FaWallet className="text-6xl mx-auto mb-4 opacity-20" />
            <p>No transactions yet</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BankSetup;
