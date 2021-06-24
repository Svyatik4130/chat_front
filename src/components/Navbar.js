import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'


export default function Navbar() {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)
    const history = useHistory()

    const logIn = () => {
        history.push(LOGIN_ROUTE)
    }

    const logOut = async() => {
        await auth.signOut()
        history.push(LOGIN_ROUTE)
    }   

    return (
        <div className="bg-green-600">
            <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center flex-wrap">
                    <div className="flex-1 flex items-center">
                        <p className="ml-3 font-black text-xl sm:text-3xl text-white truncate">
                            Svyatik's Chat
                        </p>
                    </div>
                    <div className="mt-2 flex-1 w-full flex flex-row-reverse sm:mt-0 sm:w-auto">
                        {user ?
                            (<button onClick={logOut} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50">
                                Log out
                            </button>)
                            :
                            (<button onClick={logIn} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50">
                                Log in
                            </button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
