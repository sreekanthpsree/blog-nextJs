import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const CreditContext = createContext({
  creditBalance: undefined,
  showCreditBalance: undefined,
});

export function CreditContextProvider(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["name", "id"]);

  const [credit, setCredit] = useState();
  useEffect(() => {
    if (cookies && cookies.name) {
      axios.get(`/getuser/${cookies.id}`).then((res) => {
        setCredit(res.data.credit);
      });
    }
  }, []);
  function creditBalanceHandler(creditBalance) {
    setCredit(creditBalance);
  }

  const context = {
    creditBalance: credit,
    showCreditBalance: creditBalanceHandler,
  };

  return (
    <CreditContext.Provider value={context}>
      {props.children}
    </CreditContext.Provider>
  );
}

export default CreditContext;
