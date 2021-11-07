import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { Password } from "@mui/icons-material";

// initialize Firebase App-----------------------------
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();



    const registerUser = (email, password, name, history) => {
        // Loading ------------------------------------------------
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setAuthError('');
                
                const newUser = { email, displayName: name }
                setUser(newUser);

                //  send name to firebase after creation -------------------------

                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {

                    // Profile updated!

                }).catch((error) => {

                    // An error occurred

                });

                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
        // loading stopped ----------------------
    }




    const loginUser = (email, password, history, location) => {
        // Loading ------------------------------------------------
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(location.state)
                const destination = location?.state?.from || '/';
                // console.log(destination);
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
        // loading stopped ----------------------
    }




    const signInWithGoogle = (history, location) => {

        setIsLoading(true);

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;

                const destination = location?.state?.from || '/';
                history.replace(destination);

                setAuthError('');
            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));

    }




    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
            setAuthError('');
        }).catch((error) => {
            setAuthError(error.message);
        })
            .finally(() => setIsLoading(false));;
    }




    // observer user state --------------
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])


    return {
        user,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        isLoading,
        authError
    }
}

export default useFirebase;