import React from "react";
import { Tag } from "antd";
import { GiBeerStein } from "react-icons/gi";

function BeerName({ isFavorite, text, isChecked }) {

    return (
        <>
            {
                isFavorite && (
                    <Tag icon={<GiBeerStein />} color="gold" />
                )
            }
            {text}
            {isChecked && (
                <Tag color="green">Checked</Tag>
            )}
        </>
    )

}

export default React.memo(BeerName);