import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import '@ant-design/v5-patch-for-react-19';
import 'react-toastify/dist/ReactToastify.css'
import FullPageLoader from './components/common/FullPageLoader'
import { useSelector } from 'react-redux';


// import SignIn from './pages/SignIn/SignIn'
const SignIn = lazy(() => import("./pages/SignIn/SignIn"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword/ForgotPassword"))
const SignUp = lazy(() => import("./pages/SignUp/SignUp"))
const ContactBook =lazy(()=>import("./pages/ContactBook/ContactBook"))
const ResetPassword =lazy(()=>import("./pages/ResetPassword/ResetPassword"))

const App = () => {
  const isLoading = useSelector((state) => state.loader.isLoading); // <-- get loader state

  return (
    <>
    {isLoading && <FullPageLoader />}
      <Router>
        <Routes>
          <Route path="/" element={<Suspense fallback={<FullPageLoader/>}><SignIn /></Suspense>} />
          <Route path="/forgotPassword" element={<Suspense fallback={<FullPageLoader/>}><ForgotPassword /></Suspense>} />
          <Route path="/signUp" element={<Suspense fallback={<FullPageLoader/>}><SignUp /></Suspense>} />
          <Route path="/contacts" element={<Suspense fallback={<FullPageLoader/>}><ContactBook /></Suspense>} />
          <Route path="/resetPassword" element={<Suspense fallback={<FullPageLoader/>}><ResetPassword /></Suspense>} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
    </>
  )
}

export default App