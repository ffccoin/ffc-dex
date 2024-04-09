"use client";

import { makeStore } from "@/libs/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import store from '../redux/store';

export default function StoreProvider({ children }) {
 
  return <Provider store={store}>{children}</Provider>;
}
