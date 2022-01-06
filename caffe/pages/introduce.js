import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="container">
        <Head>
            <title>서비스 소개 - caffe : 온라인 커피 주문</title>
        </Head>

      <Header/>
      
      <h1 className="font-bold mb-4">Introduce</h1>

      <p>Caffe 서비스를 이용해서, 온라인으로 주문하고 편하게 현장에서 수령하세요!</p>

    </div>
  )
}
