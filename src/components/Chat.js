import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './Loader'
import firebase from 'firebase'

export default function Chat() {
    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)
    const [btnClass, setbtnClass] = useState("bg-gray-500 hover:bg-gray-700")
    const [value, setValue] = useState("")
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )


    useEffect(() => {
        if (!loading && user) {
            let myDiv = document.getElementById("chatarea");
            myDiv.scrollTop = myDiv.scrollHeight;

            // (async () => {
            //     const mes = await firestore.collection('messages').where("text", "==", "").get()
            //     const batch = firestore.batch();
            //     mes.forEach(doc => {
            //         batch.delete(doc.ref);
            //     });
            //     await batch.commit();
            // })()
        }
    })

    useEffect(() => {
        if (value.length > 0 && value.replace(/\s/g, '').length) {
            setbtnClass("bg-green-500 hover:bg-green-700")
        } else {
            setbtnClass("bg-gray-500 hover:bg-gray-700")
        }
    }, [value])

    const leaveAMessage = async (e) => {
        e.preventDefault()
        if (value.length > 0 && value.replace(/\s/g, '').length) {
            await firestore.collection("messages").add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: await firebase.firestore.FieldValue.serverTimestamp()
            })
            let myDiv = document.getElementById("chatarea");
            myDiv.scrollTop = myDiv.scrollHeight;
            setValue("")
        }
    }

    if (loading) {
        return <Loader />
    }

    return (user ?
        (
            <div className="w-screen h-screen flex items-stretch" style={{ height: window.innerHeight - 60 }} >
                <div className="w-full h-full m-auto rounded">
                    <div className="h-full">
                        <div className="w-full p-2 h-%95">
                            <div id="chatarea" className="border-4 border-light-blue-500 border-opacity-25 overflow-y-auto flex-col-reverse rounded-lg w-full h-full">
                                {messages.map((message) => {
                                    if (user.uid === message.uid) {
                                        return (
                                            <div key={message.createdAt} className="flex m-4 items-end">
                                                <div className="max-w-xxs sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-6xl px-4 py-2 ml-auto bg-green-100 rounded-xl">
                                                    <div className="break-words text-left" >{message.text}</div>
                                                    <div className="text-right text-gray-400">{(() => {
                                                        if (message.createdAt !== null) {
                                                            let date = new Date(message.createdAt * 1000)
                                                            var hours = date.getHours()
                                                            var minutes = "0" + date.getMinutes()
                                                            var formattedTime = hours + ':' + minutes.substr(-2)
                                                            return (formattedTime)
                                                        }
                                                    })()
                                                    }</div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={message.createdAt} className="flex m-4 items-end">
                                                <div className="rounded-full flex items-center justify-center">
                                                    <img src={message.photoURL} className="rounded-full w-10" alt="photoURL" />
                                                </div>
                                                <div className="max-w-xxs sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-6xl ml-3 px-4 py-2 bg-gray-100 rounded-xl">
                                                    <div className="text-green-600 text-bold">{message.displayName}</div>
                                                    <div className="break-words text-left" >{message.text}</div>
                                                    <div className="text-right text-gray-400">{(() => {
                                                        let date = new Date(message.createdAt * 1000)
                                                        var hours = date.getHours()
                                                        var minutes = "0" + date.getMinutes()
                                                        var formattedTime = hours + ':' + minutes.substr(-2)
                                                        return (formattedTime)
                                                    })()
                                                    }</div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className="flex w-full p-2 pt-0 h-%5">
                            <div className="w-full h-full">
                                <form onSubmit={leaveAMessage}>
                                    <div className="flex">
                                        <div className="w-8/12 pr-2 flex-initial lg:w-11/12">
                                            <input className="shadow h-full w-full resize-none border appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Write a message..." value={value} onChange={e => setValue(e.target.value)} />
                                        </div>
                                        <button type="submit" className={`w-4/12 lg:w-1/12 flex-initial ${btnClass} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        :
        (
            <Loader />
        )
    )
}
