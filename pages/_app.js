import "@/styles/globals.css";
import { Fragment } from "react";
import "../components/layouts/navbar.css";
import "../components/layouts/Header/header.css";
import { CreditContextProvider } from "@/store/creditContext";
import Layout from "../components/layouts/layout";
import axios from "axios";
export default function App({ Component, pageProps }) {
  axios.defaults.baseURL = "http://localhost:5000";
  return (
    <CreditContextProvider>
      <Fragment>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </CreditContextProvider>
  );
}
