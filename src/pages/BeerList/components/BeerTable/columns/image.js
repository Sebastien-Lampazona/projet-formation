import { Image } from "antd";

export default () => ({
    title: 'Photo',
    dataIndex: 'image_url',
    key: 'image_url',
    width: 100,
    align: 'center',
    render: (image_url) => (
        <Image
            height={50}
            src={image_url}
        />
    )
  });