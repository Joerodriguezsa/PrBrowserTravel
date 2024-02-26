import React, { Component } from 'react';

export class Vehiculos extends Component {
    static displayName = Vehiculos.name;

    constructor(props) {
        super(props);
        this.state = { vehiculos: [], loading: true };
    }

    componentDidMount() {
        this.populateVehiculosData();
    }

    static renderVehiculosTable(vehiculos) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Referencia</th>
                        <th>Ubicacion</th>
                        <th>Disponible</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map(vehiculo =>
                        <tr key={vehiculo.id}>
                            <td>{vehiculo.referencia}</td>
                            <td>{vehiculo.ubicacion}</td>
                            <td>{vehiculo.strDisponible}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Vehiculos.renderVehiculosTable(this.state.vehiculos);

        return (
            <div>
                <h1 id="tabelLabel" >Listado de Vehiculos</h1>
                <p>Visualizacion de vehiculos.</p>
                {contents}
            </div>
        );
    }

    async populateVehiculosData() {
        const response = await fetch('api/vehiculo');
        const data = await response.json();
        console.log(data);
        this.setState({ vehiculos: data, loading: false });
    }
}
