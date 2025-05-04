import React from 'react';
import { LuPlus } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => navigate('/signIn');
  const handleRegister = () => navigate('/signUp');

  return (
    <div className="min-h-screen bg-gray-50  font-figtree">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="text-2xl font-bold text-blue-600">Contact Book</div>
        <div className="space-x-4">
          <button onClick={handleSignIn} className="px-4 py-2 text-blue-600 font-semibold rounded hover:bg-blue-50 text-sm">
            Sign In
          </button>
          <button onClick={handleRegister} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 text-sm">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Manage Your <span className="text-blue-600">Contacts</span> Easily
          </h1>
          <p className="text-gray-600 text-lg">
            Add, view, edit, and delete your contacts in one secure place. Stay organized and connected.
          </p>
          <div className="space-x-4">
            <button onClick={handleRegister} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Get Started
            </button>
            <button onClick={handleSignIn} className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50">
              Sign In
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1087/1087815.png"
            alt="Contact Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Your Personal Contact Manager</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Feature Card */}
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <div ><LuPlus className="text-blue-600 text-4xl mb-4" /></div>
              <h3 className="text-xl font-semibold mb-2">Add Contacts</h3>
              <p className="text-gray-600">Save your friends, family, and business contacts in one place.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4"><FaRegEye /></div>
              <h3 className="text-xl font-semibold mb-2">View Contacts</h3>
              <p className="text-gray-600">Access your saved contacts anytime from your dashboard.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4"><MdEdit/></div>
              <h3 className="text-xl font-semibold mb-2">Edit Contacts</h3>
              <p className="text-gray-600">Update contact details whenever you need to make changes.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4"><MdDelete /></div>
              <h3 className="text-xl font-semibold mb-2">Delete Contacts</h3>
              <p className="text-gray-600">Remove contacts you no longer need with a single click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Start Managing Your Contacts Today</h2>
        <p className="text-lg mb-8">Simple. Secure. Organized.</p>
        <button onClick={handleRegister} className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100">
          Create Free Account
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
