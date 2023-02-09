import React, { useMemo, useCallback, useState, useImperativeHandle } from 'react';
import { Drawer, Image, Typography, Col, Row, Divider, Progress, List, Tag, Space, Tooltip, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import ApiCaller from 'src/commons/ApiCaller';
import { GiBeerStein, GiHops, GiSolidLeaf, GiWheat } from 'react-icons/gi';
import { IoFastFood } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import favoriteBeerAtom from '@recoil/beer/atom/favorite';

function BeerDetailDrawer(_props, ref) {
  const [state, setState] = useState({
    beerID: null,
    initialData: undefined,
  });

  const [favoriteBeer, setFavoriteBeer] = useRecoilState(favoriteBeerAtom);

  const resetDrawer = useCallback(() => setState({
    beerID: null,
    initialData: undefined,
  }), []);

  useImperativeHandle(ref, () => ({
    openDrawer: (_beerID, initialData = []) => {
      setState({
        beerID: _beerID,
        initialData: [initialData],
      });
    },
    closeDrawer: resetDrawer,
  }), []);

  const {
    data,
    isSuccess,
  } = useQuery(['beers', state.beerID], () => {
    if (!state.beerID) return null;
    return ApiCaller.makeRequest('GET', `/beers/${state.beerID}`);
  }, {
    placeholderData: state?.initialData,
    enabled: !!state?.beerID,
  });

  const maxABV = 15;
  const beerData = useMemo(() => data?.[0] || null, [data]);

  const toggleFavorite = useCallback(() => {
    if (favoriteBeer?.id === beerData?.id) {
      setFavoriteBeer(null);
    }
    else {
      setFavoriteBeer(beerData);
    }
  }, [beerData, favoriteBeer, setFavoriteBeer]);

  return (
    <Drawer
      className="beerDetailDrawer"
      width={640}
      placement="right"
      onClose={resetDrawer}
      open={!!state.beerID}
      title={beerData?.name ? `Détail de la ${beerData?.name}` : null}
    >
      {isSuccess && (
        <>
          <Tooltip placement="left" title={favoriteBeer ? 'Ne plus définir comme bière favorite' : 'Définir comme bière favorite'}>
            <Button
              size="large"
              onClick={toggleFavorite}
              type={favoriteBeer?.id === beerData?.id ? 'primary' : 'default'}
              shape="circle"
              icon={<GiBeerStein />}
              className="favoriteBtn"
            />
          </Tooltip>
          <Row>
            <Col xs={2} sm={4} md={6} lg={6} xl={6}>
              <Image
                preview={{
                  src: beerData.image_url,
                }}
                width={100}
                src={beerData.image_url}
              />
            </Col>
            <Col xs={22} sm={20} md={18} lg={16} xl={16}>
              <Row>
                <Col offset={6}>
                  <Progress type="dashboard" percent={(100 / maxABV) * beerData.abv} format={() => `${beerData.abv}%`} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography.Title level={2}>{beerData.name}</Typography.Title>
                  <Typography.Paragraph style={{ fontWeight: 'bold' }}>{beerData.tagline}</Typography.Paragraph>
                  <Typography.Paragraph>{beerData.description}</Typography.Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>

          <Divider>Détail</Divider>
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                title: 'Houblons',
                description: (
                  <Space wrap>
                    {beerData.ingredients.hops.map((hop, index) => (
                      <Tag
                        key={hop.name + index}
                        icon={<GiHops />}
                        color={favoriteBeer?.ingredients?.hops.find((searchHop) => searchHop.name === hop.name) ? 'magenta' : 'green'}
                      >
                        &nbsp;{hop.name} - {hop.amount.value} {hop.amount.unit}
                      </Tag>
                    ))}
                  </Space>
                ),
              },
              {
                title: 'Malts',
                description: (
                  <Space wrap>
                    {beerData.ingredients.malt.map((malt) => (
                      <Tag
                        key={malt.name}
                        icon={<GiSolidLeaf />}
                        color={favoriteBeer?.ingredients?.malt.find((searchMalt) => searchMalt.name === malt.name) ? 'magenta' : 'lime'}
                      >
                        &nbsp;{malt.name} - {malt.amount.value} {malt.amount.unit}
                      </Tag>
                    ))}
                  </Space>
                ),
              },
              {
                title: 'Levure',
                description: <Tag icon={<GiWheat />} color={favoriteBeer?.ingredients?.yeast === beerData.ingredients.yeast ? 'magenta' : 'gold'}> {beerData.ingredients.yeast}</Tag>,
              },
              {
                title: 'S\'accorde avec',
                description: (
                  <Space wrap>{beerData.food_pairing.map((food) => (
                    <Tag key={food} icon={<IoFastFood />} color="brown"> {food}</Tag>
                  ))}
                  </Space>
                ),
              },
              {
                title: 'Petit conseil',
                description: beerData.brewers_tips,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </>
      )}

    </Drawer>
  );
}

const ForwardedBeerDetailDrawer = React.forwardRef(BeerDetailDrawer);

ForwardedBeerDetailDrawer.propTypes = {};

export default React.memo(ForwardedBeerDetailDrawer);
