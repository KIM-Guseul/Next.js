import { useCallback, useEffect, useMemo, useState } from 'react'
import {useRouter} from 'next/router'

import axios from 'axios'


export default function SignUp(){
    const router = useRouter();
    
    const [email , setEmail] = useState ('');
    const [password , setPassword] = useState('');
    const [name , setName] = useState('');

    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [touchedName, setTouchedName] = useState(false);

    //const [errors , setErrors] = useState({});
    const errors = useMemo(()=>{
        const errors = {};
        if (!email) {
            errors.email = '이메일은 필수 입력 항목입니다.';
        } else if (!password) {
            errors.password = '비밀번호는 필수 입력 항목입니다.';
        } else if (!name) {
            errors.name = '이름은 필수 입력 항목입니다.';
        }
        return errors;

        setErrors(errors)
    }, [email, password, name])
    

    const submit = useCallback((e) => {

        e.preventDefault();
        
        if(Object.keys(errors).length > 0){
            alert('양식을 확인해주세요')
            return;
        }

        axios.post(process.env.API_HOST + '/auth/sign-up', {
            email,
            password,
            name
        } )
        .then(()=>{
            alert('회원가입 완료')
            router.push('/auth/sign-in'); //로그인 페이지로 이동
        })
        .catch((error)=>{
            alert(error.response?.data?.message ?? error.message ?? '서버와 통신에 실패했습니다')
        })

    }, [email, password, name, errors])

    return(

        <>

        <div className="container">
            <h1>회원가입</h1>

            <form onSubmit={submit}>

                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="emailInput" 
                    placeholder="이메일"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    onFocus={() => setTouchedEmail(true)}
                    />
                    <p className="text-danger mt-2">{errors.email && touchedEmail && errors.email}</p>
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="passwordInput" 
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    onFocus={() => setTouchedPassword(true)}
                    />
                    <p className="text-danger mt-2">{errors.password && touchedPassword && errors.password}</p>
                </div>

                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="nameInput" 
                    placeholder="이름"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    onFocus={() => setTouchedName(true)}
                    />
                    <p className="text-danger mt-2">{errors.name && touchedName && errors.name}</p>

                </div>

                <div>
                    <button 
                    type="submit" 
                    className="btn btn-primary"
                    >
                    회원가입</button>
                </div>

            </form>
        </div>
        
        </>

    )

}