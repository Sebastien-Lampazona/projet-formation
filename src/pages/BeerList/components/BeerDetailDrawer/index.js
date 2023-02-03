import React, { useState, useCallback, useImperativeHandle, useMemo } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import ApiCaller from 'src/commons/ApiCaller';

function BeerDetailDrawer (props, ref) {
    const [state, setState] = useState({
        open: false,
        id: null,
        placeholderData: undefined,
    });

    const {
        isFetching,
        isLoading,
        isError,
        error,
        data,
    } = useQuery(['beer', state.id], () => ApiCaller.makeRequest('GET', `/beers/${state.id}`), {
        enabled: state.id !== null,
        placeholderData: state.placeholderData,
    });

    const beerDetail = useMemo(() => data?.[0], [data]);

    useImperativeHandle(ref, () => ({
        open: (id, placeholderData = undefined) => {
            setState({
                open: true,
                id,
                placeholderData,
            });
        }
    }), []);

    const onClose = useCallback(() => {
        setState({
            open: false,
            id: null,
        });
    }, []);

    let DrawerContent = null;

    if (isLoading) {
        DrawerContent = <p>Loading...</p>;
    }
    else if (isError) {
        DrawerContent = <p>{error.message}</p>;
    }
    else if (data) {
        DrawerContent = (
            <>
                {isFetching && <p>Fetching...</p>}
                <p>{beerDetail?.name}</p>
            </>
        );
    }

    return (
        <Drawer title={beerDetail?.name || null} placement="right" onClose={onClose} open={state.open}>
            {DrawerContent}
        </Drawer>
    );
}

export default React.forwardRef(BeerDetailDrawer);