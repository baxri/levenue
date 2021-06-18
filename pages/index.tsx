import React from "react";
import { GetServerSideProps } from "next";

import {API_URL} from '../config';
import Layout from "../components/Layout";

type Payout = {
  id: number;
  amount: number;
  actualAmount: number;
  bidPrice: number;
};

type Props = {
  payouts: Payout[];
  mrr: number;
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>My Payouts</h1>
        <p className="mrr">Your current MRR is: ${props.mrr.toFixed(2)}</p>
        <main>
          {props.payouts.length > 0 ? (
            props.payouts.map(
              ({ id, amount, actualAmount, bidPrice }: Payout) => (
                <div key={id} className="payout">
                  {`ID: ${id} Amount: $${amount} ActualAmount: $${actualAmount} Bid Price: $${bidPrice}`}
                </div>
              )
            )
          ) : (
            <p>You do not have payouts yet!</p>
          )}
        </main>
      </div>
      <style jsx>{`
        .payout {
          background: white;
          padding: 2em;
          margin-bottom: 1em;
        }

        .mrr{
          color: lightgreen;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO API URL SHOULD BE IN ENV
  const mrrRes = await fetch(`${API_URL}/api/mrr`);
  const mrrResponseJson = await mrrRes.json();

  const payoutRes = await fetch(`${API_URL}/api/feed`);
  const payoutResponseJson = await payoutRes.json();
  return {
    props: { payouts: payoutResponseJson, mrr: mrrResponseJson.mrr },
  };
};

export default Blog;
