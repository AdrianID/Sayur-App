import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFish,
  faBomb,
  faWaveSquare,
  faSnowflake,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Sayuran")
    return <FontAwesomeIcon icon={faSeedling} className="mr-2" />;
  if (nama === "Bumbu")
    return <FontAwesomeIcon icon={faBomb} className="mr-2" />;
  if (nama === "Lauk Pauk")
    return <FontAwesomeIcon icon={faFish} className="mr-2" />;
  if (nama === "Frozen Food")
    return <FontAwesomeIcon icon={faSnowflake} className="mr-2" />;
  if (nama === "Mie")
    return <FontAwesomeIcon icon={faWaveSquare} className="mr-2" />;

  return <FontAwesomeIcon icon={faWaveSquare} className="mr-2" />;
};

export default class DaftarKategori extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, pilihKategori } = this.props;
    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={pilihKategori === category.nama && "category-aktif"}
                style={{cursor : 'pointer' }}
              >
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
