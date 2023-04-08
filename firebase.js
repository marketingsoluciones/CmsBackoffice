import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfigAdminBodas = {
  apiKey: "AIzaSyB-b-DmN66gmSnQFp5oA7RARmcgHgjX5Xo",
  authDomain: "adminbodas.firebaseapp.com",
  projectId: "adminbodas",
  //storageBucket: "adminbodas.appspot.com",
  messagingSenderId: "75913806496",
  appId: "1:75913806496:web:a2c8f56185e8b7239e3fc5",
  measurementId: "G-C1MK53CP18"
};

const firebaseConfig = {
  apiKey: "AIzaSyDVMoVLWWvolofYOcTYA0JZ0QHyng72LAM",
  authDomain: "bodasdehoy-1063.firebaseapp.com",
  projectId: "bodasdehoy-1063",
  messagingSenderId: "593952495916",
  appId: "1:593952495916:web:c63cf15fd16a6796f6f489",
  measurementId: "G-GWQ17NF2YR",
};

const firebaseClient = initializeApp(firebaseConfig);

firebaseClient
const auth = getAuth()


export { auth };
