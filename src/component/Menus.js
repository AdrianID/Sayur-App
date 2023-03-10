import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={()=> masukKeranjang(menu)} >
        <Card.Img
          variant="top"
          src={
            process.env.PUBLIC_URL+"/Asset/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
          className="img-fluid card-img-top"
        />
        <Card.Body>
          <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
