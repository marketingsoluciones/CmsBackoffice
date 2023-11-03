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
const firebaseConfigPlanificador = {
  apiKey: "AIzaSyA_BIthVz_uwQR7gObnKPjI2KincIvP5lo",
  authDomain: "eventosplanificador-74e59.firebaseapp.com",
  projectId: "eventosplanificador-74e59",
  messagingSenderId: "1087923505585",
  appId: "1:1087923505585:web:7573effc0a8663d5429590",
  measurementId: "G-BJK5EBV8H0"
};
const firebaseConfigOrganizador = {
  apiKey: "AIzaSyD3O0Nb4du1DPZod-6ZGpzw4jLGjXXKKUI",
  authDomain: "eventosorganizador-2ed10.firebaseapp.com",
  projectId: "eventosorganizador-2ed10",
  messagingSenderId: "492151341830",
  appId: "1:492151341830:web:35178ccf72d2dbcf6d1487",
  measurementId: "G-FC99T7WZS8"
};
const firebaseConfigVivetuboda = {
  apiKey: "AIzaSyCkj2D1mO-jdMUDwAQVL7tXCGuNusT5ubc",
  authDomain: "vivetuboda-l.firebaseapp.com",
  projectId: "vivetuboda-l",
  messagingSenderId: "209046290590",
  appId: "1:209046290590:web:db0fbe47c3963ddd143b8f",
  measurementId: "G-PTQM1HELZC"
};

export const developments = [
  {
    name: "bodasdehoy",
    fileConfig: firebaseConfigBodas,
    cookie: "sessionBodas",
    domain: "https://bodasdehoy.com"
  },
  {
    name: "diariocivitas",
    fileConfig: firebaseConfigCivitas,
    cookie: "sessionCivitas",
    domain: "https://diariocivitas.com"
  },
  {
    name: "eventosplanificador",
    fileConfig: firebaseConfigPlanificador,
    cookie: "sessionPlanificador",
    domain: "https://eventosplanificador.com",
  },
  {
    name: "eventosorganizador",
    fileConfig: firebaseConfigOrganizador,
    cookie: "sessionOrganizador",
    domain: "https://eventosorganizador.com",
  },
  {
    name: "vivetuboda",
    fileConfig: firebaseConfigVivetuboda,
    cookie: "sessionVivetuboda",
    domain: "https://vivetuboda.com",
  },
]

