import React from 'react';
import PropTypes from 'prop-types';
import { GiHops, GiSolidLeaf, GiWheat } from 'react-icons/gi';
import { IoFastFood } from 'react-icons/io5';
import { List, Tag, Typography, Col, Row, Progress, Skeleton, Space } from 'antd';

function BeerDetailDrawerListDetail({ beerData, favoriteBeer, loading }) {
  return (
    <Skeleton loading={loading} active>
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
                    {hop.name} - {hop.amount.value} {hop.amount.unit}
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
                    {malt.name} - {malt.amount.value} {malt.amount.unit}
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
    </Skeleton>
  );
}

BeerDetailDrawerListDetail.propTypes = {
  beerData: PropTypes.shape({
    ingredients: PropTypes.shape({
      hops: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string,
        }),
      })),
      malt: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string,
        }),
      })),
      yeast: PropTypes.string,
    }),
    food_pairing: PropTypes.arrayOf(PropTypes.string),
    brewers_tips: PropTypes.string,
  }).isRequired,
  favoriteBeer: PropTypes.shape({
    ingredients: PropTypes.shape({
      hops: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string,
        }),
      })),
      malt: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.shape({
          value: PropTypes.number,
          unit: PropTypes.string,
        }),
      })),
      yeast: PropTypes.string,
    }),
    food_pairing: PropTypes.arrayOf(PropTypes.string),
    brewers_tips: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

BeerDetailDrawerListDetail.defaultProps = {
  loading: false,
};

export default React.memo(BeerDetailDrawerListDetail);
