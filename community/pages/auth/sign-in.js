import axios from 'axios';
import { Formik } from 'formik';
import {useRouter} from 'next/router'


const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

/*
:: 요청 헤더 설정
axios.get( 'url' , {
    headers : {
        Authorization : 'Bearer TOKEN_HERE'
    }
} );

axios.post( 'url' , {... params} , {
    headers : {
        Authorization : 'Bearer TOKEN_HERE'
    }
} );

axios :: 글로벌하게 데이터 설정 가능해. 
:: 전역 헤더 설정
axios.defaults.headers.common.Authorization = 'Bearer TOKEN_HERE';

*/


export default function SignIn(){
    const router = useRouter();

    return(
        <>
        <div className='container'>
            <h1>로그인</h1>

            <Formik
                initialValues={{
                    email : '',
                    password : '',
                }}
                validate={ values => {
                    const errors ={}
                    if(!values.email){
                        errors.email = '이메일을 입력하세요.';
                    }else if (!emailRegExp.test(values.email)) {
                        errors.email = '이메일 형식이 올바르지 않습니다.';
                    }else if(!values.password){
                        errors.password = '비밀번호를 입력하세요'
                    }
                    return errors;
                }}
                onSubmit={ (values , {setSubmitting} ) => {
                    setSubmitting(true);
                    axios.post(process.env.API_HOST + '/auth/sign-in', values)
                    .then( 
                        response => {
                            const token = response.data.token.token;
                            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                            router.push('/me');

                        })
                    .catch((error)=>{
                        alert(error.response?.data?.message ?? error.message ?? '서버와 통신에 실패했습니다')
                    })
                    .finally(()=>{
                        setSubmitting(false);
                    })
                }}
            > 

                { ( {values , errors , touched , isSubmitting , handleChange, handleBlur , handleSubmit} ) => (

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            id="emailInput" 
                            placeholder="이메일"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            <p className="text-danger mt-2">{errors.email && touched.email && errors.email}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            id="passwordInput" 
                            placeholder="비밀번호"
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            <p className="text-danger mt-2">{errors.password && touched.password && errors.password}</p>
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >
                                {isSubmitting ? '로그인 중..' : '로그인'}
                            </button>

                        </div>



                    </form>

                )} 

            </Formik>






        </div>
        
        
        
        
        </>
    )
}