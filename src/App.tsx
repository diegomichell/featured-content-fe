import React from 'react';
import {Provider} from "react-redux";
import {store} from "./store";
import Home from "./screens/Home";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <div className="md:container md:mx-auto px-4 py-4 md:py-8">
        <Home/>
        <ToastContainer/>
      </div>
    </Provider>
  );
}

export default App;
