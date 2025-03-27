
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import useLogin from "@/hooks/mutations/login";
import ButtonLoader from "@/components/ui/buttonLoader";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Valid email is required.")
    .email("Please enter a valid email address."),
  password: yup.string().min(8, "Minimum 8 digits").required("Password is required."),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const login = useLogin()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const formData= new FormData()
      formData.append("email",values.email)
      formData.append("password",values.password)
      login.mutate(formData)
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 flex md:justify-center items-center ">
            <div className=" w-full m-5 md:m-0 md:max-w-md p-6 bg-white rounded-2xl shadow-md">
        <div className="md:my-6 text-black">
          <div className="flex justify-center mb-8">
            <Image src="/assets/logo.svg" height={40000} width={40000} alt="logo" className="py-4 lg:p-0 w-24 lg:w-32" priority="" />
          </div>
          <div className="mb-8 ml-4 text-center">
            <h1 className="text-xl sm:text-3xl font-semibold">
              Log in to your account
            </h1>
            <p className="text-sm sm:text-md mt-2 sm:mt-3 ">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="m-3 ">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-[500]">Email</label>
                <div className="relative mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-sm text-red-500 m-2">{formik.errors.email}</div>
                )}
              </div>
              <div>
                <label className="m-2 font-semibold">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {showPassword ? (
                    <EyeIcon
                      className="text-gray-400 h-6 w-6 absolute right-3 z-10 top-2 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="text-gray-400 h-6 w-6 absolute right-3 z-10 top-2 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-sm text-red-500 m-2">{formik.errors.password}</div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center my-3">
              <div className="flex items-center">
                {/* <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-xs relative top-[1px] sm:top-0 sm:text-sm">
                  Remember for 30 days
                </label> */}
              </div>
              <Link href="/forgot-password">
                <p className="text-sm sm:text-md text-primary-500 font-semibold cursor-pointer">
                  Forgot password?
                </p>
              </Link>
            </div>

            <button
              type="submit"
              className="text-white bg-primary-500 w-full flex justify-center py-2 rounded-lg font-[500] hover:bg-green-600 cursor-pointer duration-300 ease-in-out my-2"
            >
              {login.isLoading ? <ButtonLoader text={'Singing in...'}/> : 'Sign in' }
             
            </button>
          </form>

          <div className="mt-7 text-center ">
            <h1 className="text-sm sm:text-md flex justify-center">
              Don’t have an account?{" "}
              <Link href="/register">
                <p className="text-primary-500 font-semibold cursor-pointer ml-2">
                 Register
                </p>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
