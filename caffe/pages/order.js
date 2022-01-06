import {useState , useMemo, Fragment , useEffect} from 'react'
import axios from 'axios';
import Header from '../components/Header'
import Head from 'next/head'
import useSWR from 'swr'


const formatter = Intl.NumberFormat('ko-KR');

// const menu = [
//     {name : '오늘의 커피' , price : 2500 },
//     {name : '에스프레소' , price : 3000 },
//     {name : '아메리카노' , price : 4000 },
//     {name : '카페라떼' , price : 5000 },
//     {name : '아포카토' , price : 6000 },
// ];

/*
SWR :: 한번 데이터를 로드하면 로드된 데이터들을 캐시로 가지고있어
*/
const fetcher = function(url){
    return axios.get(url)
    .then(response => response.data); 
    //fetcher :: promise 리턴할 때 정확하게 데이터만 딱 리턴하는걸 원칙으로 해
}
//fetcher :: 데이터를 패치하기 위한 프로미스 함수 생성.


export default function Order(props) {
    // console.log('props.menu', props.menu);
    const [isSelected , setIsSelected] = useState( [] );
    const [menu , setMenu] = useState( [] );

    const sum = useMemo( () => {
        // let value = 0;
        // isSelected.forEach( item => value += item.price);
        // return value;
        return isSelected.reduce( (preValue , item) => preValue + item.price , 0);
    } , [isSelected] );

    const {data , error} = useSWR('http://localhost:3000/api/menu' , fetcher)
    // console.log('data',data, 'error',error)


    // useEffect(() => {
    //     // fetch('/api/menu')
    //     // .then( response => response.json())
    //     // .then(json => setMenu(json))
    //     // .catch(console.warn)

    //     axios.get('/api/menu')
    //     .then(response => setMenu(response.data))
    //     .catch(console.warn)

    // },[])
    /*
    cs에서는 2번의 렌더 / ss에서는 1번의 렌더 발생
    -> ss에서는 useEffect에 대한 동작이 일어나지 않아(첫번째 렌더 한번만 발생)
    -> 소스페이지에 받아온 데이터 X -검색 X
    */

   if( error ){
       return "ERROR"
   }

   if(!data){
       return "LOADING"
   }


    return (
        <div className="container">
            <Head>
                <title>주문하기 - caffe : 온라인 커피 주문</title>
            </Head>
            <Header/>

            <h1 className="font-bold mb-4">Order</h1>
            <h2 className="text-2xl font-bold mb-4">메뉴</h2>

            <dl>
                {
                    data.map( menuItem => (
                        <Fragment key={menuItem.name}>
                            <dt>{menuItem.name}</dt>

                            <dt>{formatter.format(menuItem.price)}원 

                                <small>
                                    <button onClick={ ()=> {
                                        if(isSelected.includes(menuItem)){
                                            setIsSelected(isSelected.filter(item => item !== menuItem));
                                        }else{
                                            setIsSelected([...isSelected, menuItem]);
                                        }
                                    }}>
                                        [{isSelected.includes(menuItem) ? '선택해제' : '선택'}]   
                                    </button>
                                </small>

                            </dt>
                            
                        </Fragment>
                    ))
                }
            </dl>
            
            <hr/>

            <h2 className="text-2xl font-bold mt-4 mb-4">주문서</h2>
            
            <ul>
                {isSelected.map( item => <li key={item.name}>{item.name}</li>) }
            </ul>

            총 : { formatter.format(sum) } 원

            <div className='mt-4' onClick={() => {
                confirm (`주문 합계는 ${formatter.format(sum)}입니다. 주문하시겠습니까?`);
            }}>
                <button className="btn btn-outline-primary btn-lg" type="button">주문하기</button>
            </div>
            
        </div>
    )
}

// export async function getServerSideProps(context) {
//     const response = await axios.get('http://localhost:3000/api/menu')
//     return {
//       props: {
//           menu : response.data,
//       }, // oder의 프롭스로 들어가
//     }
//   }

  /*
  getServerSideProps 
  :: pages 밑에서만 동작하는 특수한 속성.
  :: server side에서만 데이터 로드
  :: 렌더링 되는 최초 시점에 (화면이 그려지기 전에) 데이터 전달

  :: 외부 서버 영향 많이 받아. 데이터 양 많으면 아예 페이지 전체가 멈춘것처럼 보여

  useEffect :: client side에서만 동작.
  */

