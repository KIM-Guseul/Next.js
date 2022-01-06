import Header from '../components/Header'
import Head from 'next/head'


export default function Hiring() {
  return (
    <div className="container">
    <Head>
        <title> 구인 - Caffe : 온라인 커피 주문</title>
      </Head>

      <Header/>
      
      <h1 className="font-bold mb-4">Hiring</h1>
      <p>Cafee에서는 새로운 가족을 기다리고 있습니다.</p>

    </div>
  )
}
