import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from "@apollo/client";
import INFO_ANT from "./querys/ant-query";
import {Ant} from "./entities/ant";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import ModalComponent from "./components/modal";

function App() {
  const { loading, error, data, refetch } = useQuery(INFO_ANT);
  const [modalShow, setModalShow] = React.useState(false);
  const [ant, setAnt] = React.useState({});

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>an error occurred...</p>;
  }

    function generateAntWinLikelihoodCalculator() {
        const delay = 7000 + Math.random() * 7000;
        const likelihoodOfAntWinning = Math.random();
        alert('delay ' + delay +' likelihoodOfAntWinning '+likelihoodOfAntWinning)
        return (callback:any) => {
            setTimeout(() => {
                callback(likelihoodOfAntWinning);
                console.log(callback)
            }, delay);
        };
    }

  return (
      <section className="parent">
          <Container>
              <Row className="justify-content-md-center text-center" style={{marginBottom: "20px", marginTop: "20px"}}>
                  <Col>
                    <Button variant="outline-primary"
                            onClick={() => refetch()}>Update Ants</Button>{' '}
                    <Button variant="outline-primary"
                            onClick={() => generateAntWinLikelihoodCalculator()}
                    >Start a Race</Button>
                  </Col>
              </Row>
              <Row className="justify-content-md-center">
                  <Col>
                    <Table striped bordered hover>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th style={{width: "20px"}}></th>
                      </tr>
                      </thead>
                      <tbody>
                    {data.ants.map((ant:Ant, index:number) => (
                        <tr>
                            <td>{index+1}</td>
                          <td>{ant.name}</td>
                          <td><Button variant="primary" onClick={() => { setAnt(ant); setModalShow(true) }}> {">"} </Button></td>
                        </tr>
                    ))}
                      </tbody>
                    </Table>
                  </Col>
              </Row>
          </Container>
          <ModalComponent
              ant={ant}
              show={modalShow}
              onHide={() => setModalShow(false)}
          />
      </section>
  );
}

export default App;
