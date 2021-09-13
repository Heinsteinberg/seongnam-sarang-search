const Store = props => {
    const store = props.store;

    return (
        <>
            <fieldset>
                <legend>
                    <strong>{store.name} [{store.item || '(품목 미기재)'}]</strong>
                </legend>
                주소: {store.location.full || '(미기재)'}<br/>
                전화번호: {store.tel || '(미기재)'}<br/>
                결제방법: {store.payment || '(미기재)'}<br/>
            </fieldset>
        </>
    );
};

export default Store;