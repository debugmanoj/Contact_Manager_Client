import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import UserRepository from '../../API-Repository/Users/UserRepositoryApi';
import { notification } from 'antd';

const schema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await UserRepository.forgotPassword(data)
      if (!result?.isPassed) {
        const { fieldError, description, message } = result?.response?.data || {};
        setError(fieldError, { type: "manual", message: description });
        notification.error({
          message: message,
          description: description,
          placement: 'topRight',
        });
      }
      if (result.isPassed) {
        const { message, description } = result
        notification.success({
          message: message,
          description: description,
          placement: 'topRight',
        });

      }
    } catch (error) {
      notification.error({
        message: "System Error.",
        placement: 'topRight',
      })
    }

    // Call backend API here, e.g., await UserRepository.forgotPassword(data)
  };

  const handleBackToSignIn = () => {
    navigate("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-poppins">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset your password</h2>
        <p className="text-sm text-gray-500 text-center">Enter your email to receive reset instructions.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="JonDoe@work.com"
              onChange={(e) => {
                clearErrors('email');
                register('email').onChange(e);
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Remembered your password?{' '}
          <a onClick={handleBackToSignIn} className="text-blue-500 hover:underline cursor-pointer">
            Back to Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
