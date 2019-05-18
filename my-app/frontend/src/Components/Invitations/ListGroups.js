﻿import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import { Button, Col, Row, TabContent } from 'reactstrap';

class ListGroups extends Component {

    KlikniecieSubmit = async (event) => {
        event.preventDefault();
   

        const token = await axios.post('http://localhost:5000/ReadToken', {
            token: localStorage.getItem('token')
        });
       // console.log(token.data.user.id);
        //console.log(this.props.info.id);
        const OdpowiedzSerwera2 = await axios.post('http://localhost:5000/Zaproszenia/Dolacz_Wysylajac_Tylko_Zapytanie', {
            id: token.data.user.id,
            grupa: this.props.info.id
        });


        if (OdpowiedzSerwera2.data.zwracam_czy_stworzono === true) {
            Alert.success('Wysłano prośbe o dołączenie do podanej grupy!', { position: 'bottom' });


        }  
        else if (OdpowiedzSerwera2.data.zwracam_czy_stworzono === false) {
            Alert.error('Wystąpił błąd podczas wysłania prośby o dołączenie!', { position: 'bottom' });
        }
    }

    render() {
        return (
            <div>
                <TabContent>
                        <Row className="show-grid">
                            <Col xs={1}  >
                            </Col>
                        <Col xs={5}>
                         
                       <b> <center>{this.props.info.nazwa}</center></b>
                            </Col>

                            <Col xs={5}>
                            <form onSubmit={this.KlikniecieSubmit}>
                                <Button color="primary">Wyślij!</Button>
                        </form>
                            </Col>
                            <Col xs={1}>
                            </Col>
                    </Row> 
                    <br /> 
                </TabContent>
            </div>
        );
    }
}

export default ListGroups;