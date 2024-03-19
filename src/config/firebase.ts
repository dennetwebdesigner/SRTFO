import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOwKs-oB1wvG6d1xsNPfs-bb96GZzwd1M",
  authDomain: "sistema-de-transmissao-cdb.firebaseapp.com",
  projectId: "sistema-de-transmissao-cdb",
  storageBucket: "sistema-de-transmissao-cdb.appspot.com",
  messagingSenderId: "326895124729",
  appId: "1:326895124729:web:01b839fb6a7e1f82a32228",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.languageCode = "pt";

export function login_auth(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user as any;
      window.localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/admin";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export function validate_token(router: Function) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);
    } else {
      alert("Desconectando!");
      router("/login");
    }
  });
}

export function logout_auth() {
  signOut(auth)
    .then(() => {})
    .catch(() => {
      alert("Houve um erro, tente novamente mais tarde!");
    });
}
