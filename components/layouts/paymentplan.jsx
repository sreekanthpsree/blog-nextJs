import React from "react";
import Plans from "./plans";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRouter } from "next/router";

function PaymentPlan(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["name", "id"]);
  const router = useRouter();
  function idCatcher(id) {
    axios
      .post("/buyplan", {
        items: [{ id: id, quantity: 1 }],
        id: cookies.id,
      })
      .then((res) => {
        console.log(res.data.url);
        router.replace(res.data.url);
      });
  }
  const plans = [
    { price: 40, name: "4 Featured psot", id: 1 },
    { price: 80, name: "10 Featured post", id: 2 },
    { price: 120, name: "15 Featured post", id: 3 },
    { price: 200, name: "30 Featured post", id: 4 },
  ];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-gray-500 opacity-75"
        onClick={() => {
          props.onBackdropClick();
        }}
      ></div>
      <div className="bg-white rounded-lg p-6 z-20">
        <h2 className="text-lg font-medium mb-4">Choose a Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 justify-items-center">
          {plans.map((plan) => {
            console.log(plan);
            return (
              <Plans
                planName={plan.name}
                price={plan.price}
                id={plan.id}
                onButtonClick={idCatcher}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PaymentPlan;
