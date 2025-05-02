import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserRepository from '../../API-Repository/Users/UserRepositoryApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Redux/auth/authSlice';
import { showLoader,hideLoader } from "../../Redux/Loader/loaderSlice";
import { notification } from 'antd';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(showLoader())
      const result = await UserRepository.signIn(data)

      if (!result.isPassed) {
        const { fieldError, description, message } = result?.response?.data || {};
        setError(fieldError, { type: "manual", message: description });


        notification.error({
          message: message,
          description: description,
          placement: 'topRight',
        });
      }

      if (result?.isPassed) {
        const { userName, email, userId } = result
        dispatch(setCredentials({ userName, email, userId }))
        navigate("/contacts")
      }

    } catch (error) {
      notification.error({
        message: "System Error.",
        placement: 'topRight',
      })
    }
    finally{
      dispatch(hideLoader())
    }

  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword")
  }

  const handleRegister = () => {
    navigate("/signUp")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-poppins">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Contact Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="JohnDoe@example.com"
              onChange={(e) => {
                clearErrors('email');
                register('email').onChange(e);
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors?.email ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
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
              onChange={(e) => {
                clearErrors('password');
                register('password').onChange(e);
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="text-sm text-right text-blue-500 hover:underline cursor-pointer" onClick={handleForgotPassword}>
            Forgot Password?
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don't have an account? <span onClick={handleRegister} className="text-blue-500 hover:underline cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
