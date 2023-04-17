import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';



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


const firebase = developments.reduce((acc, elem) => {
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
