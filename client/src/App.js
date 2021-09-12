import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { Grid, TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import '@fontsource/roboto';

import Store from './Store';
import './app.css';

const App = () => {
    const history = useHistory();

    const [keyword, setKeyword] = useState('');
    const [inputErr, setInputErr] = useState(false);
    const [progress, setProgress] = useState(false);
    const [message, setMessage] = useState('');
    const [storeList, setStoreList] = useState([]);
    
    const onChange = e => {
        setKeyword(e.target.value);
        setInputErr(false);
    };

    const onSubmit = e => {
        e.preventDefault();
        setMessage('');
        setStoreList([]);
        if (keyword.trim() === '') {
            setInputErr(true);
        } else {
            setProgress(true);
            axios.get(`/api/find-store/${keyword}`)
                .then(res => {
                    const data = res.data;
                    setProgress(false);
                    if (data.length > 0) {
                        setStoreList(data);
                        setMessage(`${data.length}건 검색됨`);
                        history.push(`/${keyword}`);
                    } else {
                        setKeyword('');
                        setMessage('검색 결과가 없습니다');
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    useEffect(() => {
        document.documentElement.lang = 'ko';
        document.title = '성남사랑상품권 가맹점 검색기';
    }, []);

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                style={{minHeight: '100vh', padding: '0 10%'}}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ position: 'sticky', paddingBottom: '10px', backgroundColor: 'white', top: '0' }}
                >
                    <h1 style={{textAlign: 'center', margin: '10px 0'}}>
                        <a href="/" style={{ color: 'black', textDecoration: 'none' }}>성남사랑상품권<br/>가맹점 검색기</a>
                    </h1>
                    <form onSubmit={onSubmit}>
                        <TextField 
                            error={inputErr}
                            id="outlined-search"
                            label={inputErr ? '상호명을 입력하세요' : '상호명'}
                            type="search" 
                            variant="outlined"
                            fullWidth
                            onChange={onChange}
                            value={keyword}
                            InputProps={{endAdornment: <Button type="submit" variant="contained" disableElevation style={{ marginLeft: '10px' }}>검색</Button>}}
                        />
                    </form>
                    <Typography variant="caption" display="block" gutterBottom style={{ margin: '10px 0 0 10px' }}>
                        {message}
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ marginBottom: '10px' }}
                >
                    {progress && <CircularProgress style={{ margin: 'auto' }}/>}
                    {storeList.length > 0 && storeList.map((e, i) => {
                        return <Store key={i} store={e}/>
                    })}
                </Grid>
            </Grid>
        </>
    );
};

export default App;
