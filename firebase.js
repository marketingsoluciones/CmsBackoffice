import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-b-DmN66gmSnQFp5oA7RARmcgHgjX5Xo",
  authDomain: "adminbodas.firebaseapp.com",
  projectId: "adminbodas",
  storageBucket: "adminbodas.appspot.com",
  messagingSenderId: "75913806496",
  appId: "1:75913806496:web:a2c8f56185e8b7239e3fc5",
  measurementId: "G-C1MK53CP18"
};

const firebaseClient = initializeApp(firebaseConfig);

console.log(2100, firebaseClient)


const firebaseConfigBodas = {
  apiKey: "AIzaSyDVMoVLWWvolofYOcTYA0JZ0QHyng72LAM",
  authDomain: "bodasdehoy-1063.firebaseapp.com",
  projectId: "bodasdehoy-1063",
  messagingSenderId: "593952495916",
  appId: "1:593952495916:web:c63cf15fd16a6796f6f489",
  measurementId: "G-GWQ17NF2YR",
};

const firebaseConfigCivitas = {
  apiKey: "AIzaSyCAu7u6IC8ktDhYNPF3LFZLnRzZYumgCbU",
  authDomain: "diariocivitas.firebaseapp.com",
  projectId: "diariocivitas",
  messagingSenderId: "795721350576",
  appId: "1:795721350576:web:c75d61a003ac6d4037aa75",
  measurementId: "G-NR5DVJLYF1"
};


export const developments = [
  {
    name: "bodasdehoy",
    fileConfig: firebaseConfigBodas,
    cookie: "sessionBodas"
  },
  {
    name: "diariocivitas",
    fileConfig: firebaseConfigCivitas,
    cookie: "sessionCivitas"
  },
]


export const firebase = developments.reduce((acc, elem) => {
  elem.app = initializeApp(elem.fileConfig, elem.name)
  acc.push(elem)
  return acc
}, [])

export const firebaseApp = (development) => {
  console.log(6001, development)
  return firebase.filter(elem => elem.name === development)[0]?.app
}

const auth = (development) => getAuth(firebaseApp(development))


export { auth };
