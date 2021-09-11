import { useState } from 'react';
import { useHistory } from 'react-router';

import axios from 'axios';

const Store = props => {
    const store = props.store;
    return (
        <>
            <fieldset>
                <legend>{store.name}</legend>
                품목: {store.item || '(공란)'}<br/>
                주소: {store.location.full || '(공란)'}<br/>
                전화번호: {store.tel || '(공란)'}<br/>
                결제방법: {store.payment || '(공란)'}<br/>
            </fieldset>
        </>
    );
};

const App = () => {
    const history = useHistory();

    const [keyword, setKeyword] = useState('');
    const [storeList, setStoreList] = useState([]);

    const onClick = () => {
        axios.post('/api/renew')
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    };

    const onChange = e => {
        setKeyword(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        if (keyword.trim() === '') {
            alert('키워드를 입력하세요');
            setKeyword('');
        } else {
            axios.get(`/api/find-store/${keyword}`)
                .then(res => {
                    const data = res.data;
                    if (data.length > 0) {
                        alert(`${data.length}건 검색됨`);
                        setStoreList(data);
                        history.push(`/${keyword}`);
                    } else {
                        alert('검색 결과가 없습니다');
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    return (
        <>
            <h1>성남사랑상품권 가맹점 검색기(미완성)</h1>
            <a href="/">홈</a>
            {/* <div className="App">
                <button onClick={onClick}>DB 갱신</button>
            </div> */}
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="상호명을 입력하세요" onChange={onChange} value={keyword}/>
                <input type="submit" value="검색"/>
            </form>
            {storeList.length > 0 && storeList.map((e, i) => {
                return <Store key={i} store={e}/>
            })}
        </>
    );
};

export default App;
