import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Grid, TextField, Button, Typography, Backdrop, CircularProgress } from '@material-ui/core';
import '@fontsource/roboto';

import Store from './Store';
import './app.css';

const App = () => {
    const history = useHistory();

    const [prevKeyword, setPrevKeyword] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [progress, setProgress] = useState(false);
    const [resultMsg, setResultMsg] = useState('');
    const [storeList, setStoreList] = useState([]);
    
    const onChange = e => {
        setKeyword(e.target.value);
        setErrMsg('');
    };

    const onSubmit = e => {
        e.preventDefault();
        if (progress) {
            return;
        }
        if (keyword.trim() === '') {
            setErrMsg('상호명을 입력하세요');
        } else if (keyword.trim() === (prevKeyword || '').trim()) {
            setErrMsg('현재 검색된 키워드입니다');
        } else {
            const startTime = new Date();
            setPrevKeyword(keyword);
            setKeyword(keyword.trim());
            setProgress(true);
            axios.get(`/api/find-store/${keyword.trim()}`)
                .then(res => {
                    const data = res.data;
                    const timeElapsed = ((new Date()).getTime() - startTime) / 1000;
                    setProgress(false);
                    setStoreList([]);
                    scrollTop();
                    if (data.length > 0) {
                        setStoreList(data);
                        setResultMsg(`${data.length}건이 검색되었습니다(${timeElapsed}초)`);
                        history.push(`/${keyword}`);
                    } else {
                        setResultMsg(`검색 결과가 없습니다(${timeElapsed}초)`);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    const scrollTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const gotoHome = () => {
        setKeyword('');
        setPrevKeyword(null);
        setErrMsg('');
        setResultMsg('');
        setStoreList([]);
    }

    useEffect(() => {
        document.documentElement.lang = 'ko';
        document.title = '성남사랑상품권 가맹점 검색기';
    }, []);

    return (
        <>  
            <Grid
                id="outer-box"
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ padding: '0 10% 10px', position: 'sticky', backgroundColor: 'white', top: '0' }}
                >
                    <h1 style={{textAlign: 'center', margin: '30px 0'}}>
                        <Link to="/" onClick={gotoHome} style={{ color: 'black', textDecoration: 'none' }}>성남사랑상품권<br/>가맹점 검색기</Link>
                    </h1>
                    <form onSubmit={onSubmit}>
                        <TextField
                            error={errMsg !== ''}
                            id="outlined-search"
                            label={errMsg || '상호명'}
                            type="search"
                            variant="outlined"
                            fullWidth
                            onChange={onChange}
                            value={keyword}
                            InputProps={{ endAdornment: <Button type="submit" variant="contained" disableElevation style={{ marginLeft: '10px' }}>검색</Button> }}
                        />
                    </form>
                    <Typography variant="caption" display="block" gutterBottom style={{ margin: '10px 0 0 10px' }}>
                        {resultMsg}
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ padding: '0 10%', marginBottom: '10px' }}
                >
                    {storeList.length > 0 && storeList.map((e, i) => {
                        return <Store key={i} store={e}/>
                    })}
                </Grid>
            </Grid>
            {progress && <Backdrop open style={{ zIndex: '1' }}><CircularProgress style={{ margin: 'auto' }}/></Backdrop>}
            {/* <button onClick={scrollTop} style={{ position: 'fixed', top: '100px' }}>위로 가기</button> */}
        </>
    );
};

export default App;
