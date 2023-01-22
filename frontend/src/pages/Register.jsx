import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Fingerprint from "@mui/icons-material/Fingerprint";
import PasswordStrengthBar from "react-password-strength-bar";
import { useLottie } from "lottie-react";
import cover from "../assets/cover1.json";

function Register() {
  
    const options = {
      animationData: cover,
      loop: true,
    };
    const { View } = useLottie(options);
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    birthday: "",
    gender: "",
  });

  const { name, email, password, confirmPassword, address, city, postalCode , phone, birthday, gender} =
    formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      window.location.href = "/";
    }
    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        confirmPassword,
        address,
        city,
        postalCode,
        phone,
        birthday,
        gender,
      };

      dispatch(register(userData));
    }
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const TogglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const ToggleConfirmPassword = () => {
    setConfirmPasswordShow(!confirmPasswordShow);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="h-screen flex">
        <div className="hidden lg:block  flex-1 justify-center mt-32 pl-52">
          {/* <img
            className="absolute inset-0 h-full w-full object-cover"
            src="cover"
            alt=""
          /> */}
            {View}
        </div>
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 ">
                Sign up to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600" />
              Or{" "}
              <Link to="/login">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Back to Login
                </a>
              </Link>
            </div>

            <div className="mt-8">
              <div>
                <div className="mt-6 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    {/* <div className="w-full border-t border-gray-300" /> */}
                  </div>
                  <div className="relative flex justify-center text-sm">
                    {/* <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span> */}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="fullname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>

                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>

                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="******************"
                          value={password}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {/* <button
                          type="button"
                          onClick={TogglePassword}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {passwordShown ? "Hide" : "Show"}
                        </button> */}
                        <PasswordStrengthBar password={password} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>

                      <div className="mt-1">
                        <input
                          type="password"
                          placeholder="******************"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <PasswordStrengthBar password={confirmPassword} />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                      Birthday
                      </label>

                      <div className="mt-1">
                        <input
                          id="birthday"
                          name="birthday"
                          type="date"
                          placeholder="Enter your birthday"
                          value={birthday}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>

                      <div className="mt-1">
                        <input
                          type="text"
                          placeholder="Enter your Gender"
                          name="gender"
                          value={gender}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>

                      <div className="mt-1">
                        <input
                          id="phone"
                          name="phone"
                          type="number"
                          placeholder="Enter your phone"
                          value={phone}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>

                      <div className="mt-1">
                        <input
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Enter your address"
                          value={address}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>

                      <div className="mt-1">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="Enter your city"
                          value={city}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal Code
                      </label>

                      <div className="mt-1">
                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          placeholder="Enter your postal code"
                          value={postalCode}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 text-right sm:px-6 flex justify-center mt-8 hover:text-indigo-600">
                    <button type="submit">
                      <Fingerprint />
                    </button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
