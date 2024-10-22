// import React, { useEffect } from 'react'
// // import mData from './data.js'
// import { useState } from 'react'
// // import Carts from './Carts.jsx'
// import logo from '../assets/image/logo.png'
// import heroAuthImg from '../assets/image/header-image.png'
// import AuthFormModal from './AuthFormModal.ts'
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
// import { auth } from '../utils/firebase.js'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'

// interface AuthProps {
//     userData: any, // Ideally, replace 'any' with the appropriate type
//     setUserData: React.Dispatch<React.SetStateAction<any>> // Or replace 'any' with the correct type for userData
// }

// const Auth: React.FC<AuthProps> = ({ userData, setUserData }) => {
//     // const [movies, setMovies] = useState(mData)
//     const [search, setSearch] = useState({ iSearch: "" })
//     const [isSignIn, setIsSignIn] = useState(false)
//     const [userInfo, setUserInfo] = useState({})
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//     });

//     const [errors, setErrors] = useState({});

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     console.log('isSignIn', isSignIn)

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Form validation logic here
//         console.log('Form Data Submitted:', formData);
//         if (isSignIn) {
//             createUserWithEmailAndPassword(auth, formData.email, formData.password)
//                 .then((userCredential) => {
//                     const user = userCredential.user;
//                     console.log('use', user)
//                     setFormData(({
//                         name: '',
//                         email: '',
//                         password: '',
//                     }))
//                     setIsSignIn(prev => !prev)

//                     updateProfile((user), {
//                         displayName: formData.name, photoURL: "https://i.pinimg.com/474x/1a/09/3a/1a093a141eeecc720c24543f2c63eb8d.jpg"
//                     }).then((res) => {
//                         console.log('res', res)
//                         setUserData(res);
//                     }).catch((error) => {
//                         console.log('err', error)
//                     });
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message;
//                     console.log('errorCode', errorCode)
//                     console.log('errorMessage', errorMessage)
//                 });
//         } else {
//             signInWithEmailAndPassword(auth, formData.email, formData.password)
//                 .then((userCredential) => {
//                     const userData: any = userCredential.user;
//                     console.log('Login -> user', userData?.accessToken)
//                     localStorage.setItem('NetflixLoginToken', userData?.accessToken)
//                     navigate('/home')
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message;
//                     console.log('errorCode', errorCode)
//                     console.log('errorMessage', errorMessage)
//                 });
//         }
//     };

//     useEffect(() => {
//         let token: string | null = localStorage.getItem('NetflixLoginToken') || null
//         if (token) {
//             navigate('/home')
//         }
//     })
//     return (
//         <>
//             <div className='flex justify-center bg-black'>
//                 <div className='container bg-red-100 '>

//                     <div className='min-h-screen position-relative m-0 p-0 '>
//                         <img className='absolute inset-0 z-10 h-full w-full object-cover  ' src={heroAuthImg} />
//                         <div className=' absolute inset-0 z-10 bg-gradient-to-t from-transparent from-60 to-black'></div>

//                         <div className='z-30 absolute inset-0 bg-transparent'>
//                             <img className=' h-10 absolute top-5 left-5' src={logo} alt="Logo" />
//                             <div className="flex flex-col justify-center items-center h-full">
//                                 <div className="w-full max-w-xs">
//                                     <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//                                         {isSignIn && <div className="mb-4">
//                                             <label
//                                                 className="block text-gray-700 text-sm font-bold mb-2"
//                                                 htmlFor="name"
//                                             >
//                                                 Name
//                                             </label>
//                                             <input
//                                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="name"
//                                                 name="name"
//                                                 type="text"
//                                                 placeholder="Name"
//                                                 value={formData.name}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </div>}

//                                         <div className="mb-4">
//                                             <label
//                                                 className="block text-gray-700 text-sm font-bold mb-2"
//                                                 htmlFor="email"
//                                             >
//                                                 Email
//                                             </label>
//                                             <input
//                                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="email"
//                                                 name="email"
//                                                 type="email"
//                                                 placeholder="Email"
//                                                 value={formData.email}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </div>

//                                         <div className="mb-6">
//                                             <label
//                                                 className="block text-gray-700 text-sm font-bold mb-2"
//                                                 htmlFor="password"
//                                             >
//                                                 Password
//                                             </label>
//                                             <input
//                                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                                                 id="password"
//                                                 name="password"
//                                                 type="password"
//                                                 placeholder="******************"
//                                                 value={formData.password}
//                                                 onChange={handleInputChange}
//                                             />
//                                             {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
//                                         </div>

//                                         <div className="flex items-center justify-between">
//                                             <button
//                                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                                 type="submit"
//                                             >
//                                                 Sign In
//                                             </button>
//                                             <span onClick={() => setIsSignIn((prev) => { return !prev })}
//                                                 className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//                                             >
//                                                 {isSignIn ? 'Sign In' : ' Sign Up'}
//                                             </span>
//                                         </div>
//                                     </form>
//                                     <p className="text-center text-gray-500 text-xs">
//                                         ©2024 Acme Corp. All rights reserved.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Auth;










import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../assets/image/logo.png';
import heroAuthImg from '../assets/image/header-image.png';

interface AuthProps {
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const Auth: React.FC<AuthProps> = ({ setUserData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [isSignIn, setIsSignIn] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear errors on input change
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (isSignIn && !formData.name) {
            newErrors.name = 'Name is required for signing up.';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is not valid.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (isSignIn) {
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: formData.name,
                        photoURL: "https://i.pinimg.com/474x/1a/09/3a/1a093a141eeecc720c24543f2c63eb8d.jpg",
                    }).then(() => {
                        setUserData(user);
                    });
                    toast.success('Sign Up successful ')
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    toast.error('Please Enter Valid Credentials ')
                });
        } else {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    const userData: any = userCredential.user;
                    localStorage.setItem('NetflixLoginToken', userData?.accessToken);
                    navigate('/home');
                    toast.success('Login successful ')

                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    toast.error('Invalid email or password ')
                });
        }
    };

    useEffect(() => {
        const token: string | null = localStorage.getItem('NetflixLoginToken');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <>
            <div className='flex justify-center bg-black'>
                <div className='container bg-red-100'>
                    <div className='min-h-screen position-relative m-0 p-0'>
                        <img className='absolute inset-0 z-10 h-full w-full object-cover' src={heroAuthImg} alt="Hero" />
                        {/* <div className='absolute inset-0 z-10 bg-gradient-to-t from-transparent from-60 to-black'></div> */}
                        <div className='absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black'></div>
                        <div className='z-30 absolute inset-0 bg-transparent'>
                            <img className='h-10 absolute top-10 left-24' src={logo} alt="Logo" />
                            <div className="flex flex-col justify-center items-center h-full">
                                <div className="w-full max-w-xs">
                                    <form
                                        className="backdrop-filter backdrop-blur-lg bg-black bg-opacity-70 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                        onSubmit={handleSubmit}
                                    >
                                        {isSignIn && (
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-300 text-sm font-bold mb-2"
                                                    htmlFor="name"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    className={`shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : ""
                                                        }`}
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-xs italic">{errors.name}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-300 text-sm font-bold mb-2"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className={`shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : ""
                                                    }`}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs italic">{errors.email}</p>
                                            )}
                                        </div>

                                        <div className="mb-6">
                                            <label
                                                className="block text-gray-300 text-sm font-bold mb-2"
                                                htmlFor="password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                className={`shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-gray-300 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : ""
                                                    }`}
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="******************"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                            {errors.password && (
                                                <p className="text-red-500 text-xs italic">{errors.password}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="submit"
                                            >
                                                {isSignIn ? "Sign Up" : "Sign In"}
                                            </button>
                                            <span
                                                onClick={() => setIsSignIn((prev) => !prev)}
                                                className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-700 cursor-pointer"
                                            >
                                                {isSignIn ? "Switch to Sign In" : "Switch to Sign Up"}
                                            </span>
                                        </div>
                                    </form>

                                    <p className="text-center text-gray-500 text-xs">
                                        ©2024 Acme Corp. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
