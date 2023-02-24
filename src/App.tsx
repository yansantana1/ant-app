import React, {useState, useEffect} from 'react';
import './App.css';
import { useQuery } from "@apollo/client";
import INFO_ANT from "./querys/ant-query";
import {Button, Col, Container, Row} from "react-bootstrap";
import ModalComponent from "./components/modal";
import AntComponent from "./components/ant";
import generateAntWinLikelihoodCalculator from "./utils/generateAntWinLikelihoodCalculator";
import {Ant} from "./entities/ant";

function App() {
    const { loading, error, data, refetch } = useQuery(INFO_ANT);
    const [probabilityData, setProbabilityData] = useState([]);
    const [updatedDataEntry, setUpdatedDataEntry] = useState([-1, -1]);
    const [selectedAnt, setSelectedAnt] = useState<Ant>({name:'', color:'', length:0, weight:0});
    const [hasRaceStarted, setHasRaceStarted] = useState(false);
    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        const updatedProbabilityData = [...probabilityData];
        // @ts-ignore
        updatedProbabilityData[updatedDataEntry[0]] = updatedDataEntry[1];
        setProbabilityData(updatedProbabilityData);
    }, [updatedDataEntry]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>an error occurred...</p>;
  }

    function displayAntsData() {
        const nextProbabilityData: string[] | ((prevState: never[]) => never[]) = [];
        data.ants.forEach(() => nextProbabilityData.push('Not yet run'));
        // @ts-ignore
        setProbabilityData(nextProbabilityData);
        // api.fetchAnts().then((response) => {
        //     const nextProbabilityData = [];
        //     response.data.ants.forEach(() => nextProbabilityData.push('Not yet run'));
        //     setAntsData(response.data.ants);
        //     setProbabilityData(nextProbabilityData);
        // });
    }


    function fetchAntWinLikelihood(index:any) {
        return new Promise(generateAntWinLikelihoodCalculator()).then((resolved) => {
            setUpdatedDataEntry([index, resolved]);
        });
    }

    function startRace() {
        const nextProbabilityData = probabilityData.slice();
        for(let i = 0; i < data.ants.length; i++) {
            fetchAntWinLikelihood(i);
            // @ts-ignore
            nextProbabilityData[i] = 'In progress';
        }
        setProbabilityData(nextProbabilityData);
        setHasRaceStarted(true);
    }

    function selectAnt(ant:Ant) {
      setSelectedAnt(ant);
      setModalShow(true);
    }


  return (
      <section className="parent">
          <Container>
              <Row className="justify-content-md-center text-center" style={{marginBottom: "20px", marginTop: "20px"}}>
                  <Col>
                    <Button variant="outline-primary"
                            onClick={() => displayAntsData()}>Fetch Ants</Button>{' '}
                    <Button variant="outline-primary"
                            onClick={() => startRace()}
                    >Start a Race</Button>
                  </Col>
              </Row>
              <Row className="justify-content-md-center">
                  <Col>
                      <AntComponent
                          antsData={data.ants}
                          probabilityData={probabilityData}
                          hasRaceStarted={hasRaceStarted}
                          selectAnt={selectAnt}
                      />
                  </Col>
              </Row>
          </Container>
          <ModalComponent
             ant={selectedAnt}
             show={modalShow}
             onHide={() => setModalShow(false)}
          />
      </section>
  );
}

export default App;
