import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserRepository from '../../API-Repository/Users/UserRepositoryApi';


// ✅ Yup schema for password + confirm password validation
const schema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // ✅ Read token from URL

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!token) {
      setError('token', { message: 'Invalid or expired token' });
      return;
    }

    const payload = {
      token,
      newPassword: data.password,
      confirmPassword:data.confirmPassword
    };

    const result = await UserRepository.resetPassword(payload);
    // ✅ Optional: Handle response here (show success message or redirect)

    if (result?.isPassed) {
      navigate('/');
    } else {
      setError('apiError', { message: result?.message || 'Something went wrong' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 font-poppins">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create New Password</h2>
        <p className="text-sm text-gray-500 text-center">Enter your new password below.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              placeholder="Enter new password"
              onChange={(e) => {
                clearErrors('password');
                register('password').onChange(e);
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              onChange={(e) => {
                clearErrors('confirmPassword');
                register('confirmPassword').onChange(e);
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-red-500 ring-red-400' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {errors.apiError && <p className="text-red-500 text-sm mt-1 text-center">{errors.apiError.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
