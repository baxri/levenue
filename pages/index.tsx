import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'

type Payout = {
  id: number
  amount: number
  actualAmount: number
  bidPrice: number
}

type Props = {
  payouts: Payout[]
}

const Blog: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>My Payouts</h1>
        <main>
          {props.payouts.length > 0 ? props.payouts.map(({id, amount, actualAmount, bidPrice}: Payout) => (
            <div key={id} className="payout">
              {`ID: ${id} Amount: $${amount} ActualAmount: $${actualAmount} Bid Price: $${bidPrice}`} 
            </div>
          )) : <p>You do not have payouts yet!</p> }
        </main>
      </div>
      <style jsx>{`
        .payout {
          background: white;
          padding: 2em;
          margin-bottom: 1em;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO API URL SHOULD BE IN ENV
  const res = await fetch('http://localhost:3000/api/feed')
  const payouts = await res.json()
  return {
    props: { payouts },
  }
}

export default Blog
