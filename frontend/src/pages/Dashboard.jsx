import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AccountForm from "../components/AccountForm";
import { getAccounts, reset } from "../features/accounts/accountSlice";
import Spinner from "../components/Spinner";
import AccountItem from "../components/AccountItem";
import { Helmet } from "react-helmet";
import moment from "moment";
import guest from "../assets/guest.png";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { accounts, isLoading, isError, message } = useSelector(
    (state) => state.accounts
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getAccounts());
    }

    const comparetime = () => {
      const time = localStorage.getItem("token_date");
      const currenttime = new Date().getTime();
      if (currenttime - time > 3600000) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("token_date");
        window.location.reload();
      }
    };

    comparetime();

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className=" mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* Left Side */}
          <div className="w-full  md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-blue-400">
              <div className="image overflow-hidden">
                <img className="h-auto w-full mx-auto" src="guest" alt="" />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                {user && user.name}
              </h1>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-blue-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {moment(user && user.createdAt).format("MMM Do YYYY")}
                  </span>
                </li>
              </ul>
              <div className=" text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Full Name</div>
                  <div className="px-4 py-2">{user && user.name}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Gender</div>
                  <div className="px-4 py-2">{user && user.gender}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">{user && user.phone}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Current Address</div>
                  <div className="px-4 py-2">{user && user.address}</div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Permanant Address
                  </div>
                  <div className="px-4 py-2">{user && user.address}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email.</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href="mailto:jane@example.com">
                      {user && user.email}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">City</div>
                  <div className="px-4 py-2">{user && user.city}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <div className="px-4 py-2">
                    {moment(user && user.birthday).format("MMM Do YYYY")}
                  </div>
                </div>
              </div>
            </div>
            {/* End of profile card */}
            <div className="my-4" />
          </div>
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* Profile tab */}
            {/* About Section */}

            {/* End of about section */}
            <div className="my-4" />
            {/* Experience and education */}
            <div className="bg-white p-3  rounded-sm">
              <div className="">
                <section>
                  <div className="flex flex-col items-center justify-center mb-10  flex-auto flex-shrink-0">
                    <div className="relative h-56 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg w-96 overflow-hidden">
                      <svg
                        viewBox="0 0 220 192"
                        width={220}
                        height={192}
                        fill="none"
                        className="absolute -left-10 -top-16 text-blue-900 opacity-50"
                      >
                        <defs>
                          <pattern
                            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              x={0}
                              y={0}
                              width={4}
                              height={4}
                              fill="currentColor"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width={220}
                          height={192}
                          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 220 192"
                        width={220}
                        height={192}
                        fill="none"
                        className="absolute -right-20 -bottom-32 text-blue-900 opacity-50"
                      >
                        <defs>
                          <pattern
                            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              x={0}
                              y={0}
                              width={4}
                              height={4}
                              fill="currentColor"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width={220}
                          height={192}
                          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                        />
                      </svg>
                      <img
                        src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png"
                        alt=""
                        srcSet
                        className="absolute right-4 bottom-2 h-24"
                      />
                      <div className="absolute top-10 left-8 h-12 w-16 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-90 rounded-lg overflow-hidden">
                        <span className="flex absolute top-1/2 left-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 -translate-x-1/2 border border-gray-400" />
                        <span className="flex absolute top-1/2 right-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 translate-x-1/2 border border-gray-400" />
                        <span className="flex absolute top-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform -translate-y-1/2 border border-gray-400" />
                        <span className="flex absolute bottom-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform translate-y-1/2 border border-gray-400" />
                      </div>
                      <div className="absolute bottom-20 left-8 text-white font-light text-lg mb-5 space-x-1.5">
                        {user && user._id}
                      </div>
                      <div className="absolute bottom-16 left-8 text-gray-200 font-light text-base">
                        <span>10</span>
                        <span>/</span>
                        <span>25</span>
                      </div>
                      <div className="absolute bottom-6 left-8 text-gray-200 font-light text-sm uppercase">
                        <span>{user && user.name}</span>
                      </div>
                    </div>
                  </div>
                </section>

                <AccountForm />
              </div>
              {/* End of Experience and education grid */}
            </div>
            {/* End of profile tab */}
          </div>
        </div>
      </div>
              <section className="flex justify-center mb-5">
                {accounts.length > 0 ? (
                  <div className="goals">
                    {accounts.map((account) => (
                      <AccountItem key={account._id} account={account} />
                    ))}
                  </div>
                ) : (
                  <h3 className="flex justify-center">
                    You have not set any accounts{" "}
                  </h3>
                )}
              </section>
    </>
  );
}

export default Dashboard;
