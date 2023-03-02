import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, DaftarKategori, Menus } from "../component";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      pilihKategori: "Sayuran",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.pilihKategori)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });

    this.getListKeranjang();
  }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      pilihKategori: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang!",
                text: "Sukses Masuk Keranjang!" + keranjang.product.nama,
                icon: "success",
                button: false,
              });
            })
            .catch((error) => {
              console.log("Error yaa", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang!",
                text: "Sukses Masuk Keranjang!" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error yaa", error);
      });
  };

  render() {
    const { menus, pilihKategori, keranjangs } = this.state;
    return (
      <div>
        <div className="mt-3">
          <Container fluid>
            <Row>
              <DaftarKategori
                changeCategory={this.changeCategory}
                pilihKategori={pilihKategori}
              />
              <Col className="mt-3">
                <h4>
                  <strong>Produk Kami</strong>
                </h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props}  getListKeranjang={this.getListKeranjang}/>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
