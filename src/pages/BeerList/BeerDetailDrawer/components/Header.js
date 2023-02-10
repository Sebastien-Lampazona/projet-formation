import React from 'react';
import PropTypes from 'prop-types';
import { Image, Typography, Col, Row, Progress, Skeleton } from 'antd';

function BeerDetailDrawerHeader({ beerData, maxABV, loading }) {
  const colCoef = beerData.image_url ? 2 : 0;
  return (
    <Skeleton loading={loading} active>
      <Row>
        {!!beerData.image_url && (
          <Col xs={colCoef} sm={2 * colCoef} md={3 * colCoef} lg={4 * colCoef} xl={4 * colCoef}>
            <Image
              data-testid="beerDetailDrawerHeader-image"
              preview={{
                src: beerData.image_url,
              }}
              width={100}
              src={beerData.image_url}
            />
          </Col>
        )}
        <Col xs={24 - (colCoef)} sm={24 - (2 * colCoef)} md={24 - (3 * colCoef)} lg={24 - (4 * colCoef)} xl={24 - (4 * colCoef)}>
          <Row>
            <Col offset={beerData.image_url ? 6 : 8}>
              <Progress
                data-testid="beerDetailDrawerHeader-abv"
                type="dashboard"
                percent={(100 / maxABV) * beerData.abv}
                format={() => `${beerData.abv}%`}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography.Title level={2}>{beerData.name}</Typography.Title>
              <Typography.Paragraph data-testid="beerDetailDrawerHeader-tagline" style={{ fontWeight: 'bold' }}>{beerData.tagline}</Typography.Paragraph>
              <Typography.Paragraph data-testid="beerDetailDrawerHeader-description">{beerData.description}</Typography.Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </Skeleton>
  );
}

BeerDetailDrawerHeader.propTypes = {
  beerData: PropTypes.shape({
    image_url: PropTypes.string,
    abv: PropTypes.number,
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  maxABV: PropTypes.number,
  loading: PropTypes.bool,
};

BeerDetailDrawerHeader.defaultProps = {
  maxABV: 15,
  loading: false,
};

export default React.memo(BeerDetailDrawerHeader);
