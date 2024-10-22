import React, { useEffect } from 'react'
import { useState } from 'react'
import logo from '../assets/image/logo.png'
import {  onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../utils/firebase.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { API_OPTIONS } from '../utils/constants.ts'
import Movies from './Movies.tsx'
import Footer from './Footer.tsx'

interface AuthProps {
    userData: any, // Ideally, replace 'any' with the appropriate type
    setUserData: React.Dispatch<React.SetStateAction<any>> // Or replace 'any' with the correct type for userData
}

const Home: React.FC<AuthProps> = ({ userData, setUserData }) => {
    // const [movies, setMovies] = useState(mData)
    const [movies, setMovies] = useState([])
    const [heroVideo, setHeroVideo] = useState<string>('')
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user)
            } else {
                console.log('No user Found')
            }
        });
    }, [])

    useEffect(() => {

        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
            .then(response => response.json())
            .then(response => {
                setMovies(response?.results)
                fetch('https://api.themoviedb.org/3/movie/' + response?.results[0].id + '/videos', API_OPTIONS)
                    .then(response => response.json())
                    .then(response => {
                        let trailer: any = response.results.find((item: any) => item.type === "Trailer")
                        setHeroVideo(trailer?.key)
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }, [])

    function onLogOut() {
        console.log('---------------------------*********8')
        signOut(auth).then(() => {
            toast.success('you are logged out')
            localStorage.removeItem('NetflixLoginToken')
            navigate('/');
        }).catch((error) => {
            toast.error(error)
        });
    }

    useEffect(() => {
        const token: string | null = localStorage.getItem('NetflixLoginToken');
        if (!token) {
            navigate('/')
        }
    });

    return (
        <>
            <div className='flex justify-center bg-black'>
                <div className='container bg-red-100 '>

                    <div className='min-h-screen position-relative m-0 p-0 '>
                        {/* <img  src={heroAuthImg} /> */}
                        <iframe
                            className="absolute inset-0 z-10 h-full w-full aspect-video"
                            src={"https://www.youtube.com/embed/" + heroVideo + "?autoplay=1&mute=1"}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>

                        <div className=' absolute inset-0 z-10 bg-black opacity-60'></div>

                        <div className='z-40 absolute inset-0 bg-transparent'>
                            <img className=' h-12 absolute top-10 left-24' src={logo} alt="Logo" />

                            <div className='text-white text-lg absolute right-10 top-5 flex items-center gap-4 '>
                                <span>{userData?.displayName}</span>
                                <img className='h-10 rounded-full ' src={userData?.photoURL} alt="user epic" />
                                <button onClick={onLogOut} type='button' className=" ">
                                    (Logout)
                                </button>
                            </div>
                        </div>

                        <div className='flex justify-center items-center text-center z-30 absolute text-white inset-0'>
                            <div className='max-w-lg '>
                                <h4 className='text-4xl font-semibold mb-4'>Unlimited movies, TV shows and more</h4>
                                <b className='text-2xl'>Starts at ₹149. Cancel anytime.</b>
                                <p className='text-lg mt-2'>Ready to watch? Enter your email to create or restart your membership.</p>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

            <div className='bg-black'>
                <Movies movies={movies} category={'Trending Now'} />
                <Movies movies={[...movies].reverse()} category={'Recents'} />
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}


export default Home;










