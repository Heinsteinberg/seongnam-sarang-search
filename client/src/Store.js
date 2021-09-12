import { Card, Typography } from '@material-ui/core';

const Store = props => {
    const store = props.store;
    return (
        <>
            <fieldset>
                <legend>
                    <strong>{store.name}({store.item || '(품목 공란)'})</strong>
                </legend>
                주소: {store.location.full || '(공란)'}<br/>
                전화번호: {store.tel || '(공란)'}<br/>
                결제방법: {store.payment || '(공란)'}<br/>
            </fieldset>
        </>
    );
};

export default Store;