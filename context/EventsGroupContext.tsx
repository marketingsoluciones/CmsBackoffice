import { createContext, useState, useContext, useEffect, SetStateAction, Dispatch, useReducer, Reducer } from 'react';
import { AuthContextProvider } from "../context/AuthContext";
import { Event } from '../utils/Interfaces';
import { useRouter } from 'next/router';
import { fetchApiEventos, queries } from '../utils/Fetching';

type Context = {
  eventsGroup: Event[],
  setEventsGroup: Dispatch<SetStateAction<action>>
}
const EventsGroupContext = createContext<Context>({
  eventsGroup: null,
  setEventsGroup: (action: action) => null,
});

enum actions {
  EDIT_EVENT,
  INITIAL_STATE,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_A_EVENT
}


type action = {
  type: keyof typeof actions;
  payload: any;
};

const reducer = (state: Event[], action: action) => {
  switch (action.type) {
    case "EDIT_EVENT":
      return state.reduce((acc: Event[], item: Event) => {
        if (item._id === action.payload._id) {
          item = { ...item, ...action.payload }
        }
        acc.push(item)
        return acc
      }, [])
      break;
    case "INITIAL_STATE":
      return action.payload
      break
    case "ADD_EVENT":
      return [...state, action.payload]
      break
    case "DELETE_EVENT":
      return state.filter(event => event._id !== action.payload)
      break
    default:
      return state
      break;
  }
}

const EventsGroupProvider = ({ children }) => {
  const router = useRouter();
  const [eventsGroup, setEventsGroup] = useReducer<Reducer<Event[], action>>(reducer, []);
  const { user } = AuthContextProvider();

  useEffect(() => {
    if (user) {
      fetchApiEventos({
        query: queries?.getEventsByID,
        variables: { userID: user?.uid },
        token: ""
      })
        .then((events: Event[]) => {
          setEventsGroup({ type: "INITIAL_STATE", payload: events })

        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <EventsGroupContext.Provider value={{ eventsGroup, setEventsGroup }}>
      {children}
    </EventsGroupContext.Provider>
  );
};

const EventsGroupContextProvider = () => useContext(EventsGroupContext);
export { EventsGroupContextProvider, EventsGroupProvider };
