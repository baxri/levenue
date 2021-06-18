import React, { useState } from "react";
import Router from "next/router";

import { API_URL } from "../config";
import Layout from "../components/Layout";

const Draft: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setResult(null);

      const body = { amount, confirm: !!result };

      // TODO API URL SHOULD BE IN ENV
      const res = await fetch(`${API_URL}/api/payout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonRespnse = await res.json();

      if (jsonRespnse.success) {
        if (jsonRespnse.confirm) {
          await Router.push("/");
        } else {
          setResult(jsonRespnse.result);
        }
      } else {
        setError(jsonRespnse.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Make Payout</h1>
          <input
            autoFocus
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Type payout amount"
            type="text"
            value={amount}
          />
          {!!error && <p>{error}</p>}
          {!!result && (
            <div>
              <p>Amount: ${result.calculatedAmount}</p>
              <p>Actuall Amount: ${result.calculatedActuallAmount}</p>
              <p>Bid Price: ${result.bidPrice}</p>
            </div>
          )}
          <input
            disabled={!amount}
            type="submit"
            value={!result ? "Calculate" : "Confirm"}
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
