import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserRepository from '../../API-Repository/Users/UserRepositoryApi';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../Redux/Loader/loaderSlice';

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Name should contain only letters and spaces')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(showLoader())
      const response = await UserRepository.signUp(data);
      if(response.message){

        notification.success({
          message: "Account Created",
          description: "Your account has been create succesfully",
          placement:'topRight',
        })
      }

      navigate('/'); // Redirect to sign in
    } catch (error) {
      if(error?.response?.data?.message)
      {
        notification.error({
          message: error?.response?.data?.message,
          description: "Please Enter different Email Id",
          placement:'topRight',
        })

      }
    }
    finally{
      dispatch(hideLoader())
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-poppins">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="John Doe"
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="••••••••"
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
