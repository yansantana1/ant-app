import React from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {Ant} from "../entities/ant";

class AntComponent extends React.Component<{
    antsData: Ant[],
    probabilityData: any,
    hasRaceStarted: boolean,
    selectAnt: any
}> {
    render() {
        let {
            antsData,
            probabilityData,
            hasRaceStarted,
            selectAnt
        } = this.props;
        function linkData(){
            const linkedData = [];
            for(let i = 0; i < antsData.length; i++) {
                linkedData.push({ ant: antsData[i], probabilityOfWinning: probabilityData[i]});
            }
            return linkedData;
        }
        function prettyPrintProbabilityData(){
            let isRaceInProgress = false;
            const sortedData = linkData().sort((a, b) => {
                if(a.probabilityOfWinning === 'In progress') {
                    isRaceInProgress = true;
                    return 1;
                }
                return b.probabilityOfWinning - a.probabilityOfWinning;
            });
            const generalStatusLabel = 'Status: ';
            let generalStatusText;
            if(!hasRaceStarted) {
                generalStatusText = 'Not yet run';
            } else if(isRaceInProgress) {
                generalStatusText = 'In progress';
            } else {
                generalStatusText = 'All calculated';
            }
            const displayElements = [];
            for(let i = 0; i < sortedData.length; i++) {
                const key = `probability_${i}`;
                let probabilityToDisplay = sortedData[i].probabilityOfWinning;

                if (typeof probabilityToDisplay === 'number') {
                    probabilityToDisplay = `${(probabilityToDisplay * 100).toFixed(2)}%`;
                } else if(!hasRaceStarted){
                    probabilityToDisplay = 'Not yet run';
                }

                if (i === sortedData.length - 1) {
                    displayElements.push(
                        <tr key={key}>
                            <td>{sortedData[i].ant.name}</td>
                            <td>{probabilityToDisplay}</td>
                            <td><Button variant="primary" onClick={() => selectAnt(sortedData[i].ant)}> {">"} </Button></td>
                        </tr>
                    );
                } else {
                    displayElements.push(
                        <tr key={key}>
                            <td>{sortedData[i].ant.name}</td>
                            <td>{probabilityToDisplay}</td>
                            <td><Button variant="primary" onClick={() => selectAnt(sortedData[i].ant)}> {">"} </Button></td>
                        </tr>
                    );
                }
            }
            return (
                <Container>
                    <h3>ANT RACE</h3>
                    <h4>{generalStatusLabel + generalStatusText}</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr key='status'>
                                <th>Name</th>
                                <th>Likelihood</th>
                                <th style={{width:'20px'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayElements}
                        </tbody>
                    </Table>
                </Container>
            )
        }
        return (
            <div>
                {prettyPrintProbabilityData()}
            </div>
        )
    }
}

export default AntComponent;