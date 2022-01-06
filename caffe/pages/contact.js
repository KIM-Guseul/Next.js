import { useState } from 'react';
import Header from '../components/Header'
import Head from 'next/head'




export default function Contact() {
    const [email , setEmail] = useState('');
    const [subject , setSubject] = useState ('');
    const [contents , setContents] = useState ('');
    
 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(email);
        console.log(subject);
        console.log(contents);
    }

  return (
    <div className="container">
    <Head>
        <title> 컨택트 - Caffe : 온라인 커피 주문</title>
      </Head>

      <Header/>
      
      <h1 className="font-bold mb-4">Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label 
            htmlFor="exampleFormControlInput1" className="form-label">이메일</label>

            <input 
            type="email" 
            className="form-control" 
            id="exampleFormControlInput1" 
            placeholder="name@example.com"
            onChange={e => {setEmail(e.target.value)}}
            value={email}
            />
        </div>
        <div className="mb-3">
            <label 
            htmlFor="subjectInput" 
            className="form-label">제목</label>

            <input 
            type="text" 
            name="subject" 
            className="form-control" 
            id="subjectInput" 
            placeholder="제목을 입력하세요"
            onChange={e => {setSubject(e.target.value)}}
            value={subject}
            />
        </div>
        <div className="mb-3">
            <label 
            htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>

            <textarea 
            className="form-control" 
            id="exampleFormControlTextarea1" 
            rows="3"
            onChange={e => {setContents(e.target.value)}}
            value={contents}
            />
        </div>

        <button 
        className="btn btn-outline-primary btn-lg"
        onClick={handleSubmit}
        >문의하기</button>

      </form>

    </div>
  )
}
