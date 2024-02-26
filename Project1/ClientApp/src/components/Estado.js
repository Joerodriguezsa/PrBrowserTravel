import React, { Component } from 'react';

export class Estado extends Component {
    static displayName = Estado.name;

    constructor(props) {
        super(props);
        this.state = {
            estado: [],
            ubicacionesRecogida: [],
            ubicacionesDevolucion: [],
            ubicacionRecogidaSeleccionada: 0,
            ubicacionDevolucionSeleccionada: 0,
            vehiculos: [],
            referenciaVehiculoSeleccionado: '',
            loading: true
        };
    }

    componentDidMount() {
        this.populateUbicacionesData();
        this.populateVehiculosData();
        this.handleBuscarClick();
    }

    static renderEstadoTable(estado) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Referencia</th>
                        <th>Ubicacion Recogida</th>
                        <th>Ubicacion Devolucion</th>
                        <th>Estado</th>
                        <th>Disponible</th>
                    </tr>
                </thead>
                <tbody>
                    {estado.map(item =>
                        <tr key={item.id}>
                            <td>{item.referencia}</td>
                            <td>{item.ubicacionRecogida}</td>
                            <td>{item.ubicacionDevolucion}</td>
                            <td>{item.estado ? 'Reservado' : 'Finalizado'}</td>
                            <td>{item.disponible ? 'Si' : 'No'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Estado.renderEstadoTable(this.state.estado);

        return (
            <div>
                <h1 id="tabelLabel">Listado de Estados</h1>
                <p>Visualizacion de estados.</p>

                <div>
                    <label>Ubicacion Recogida:</label>
                    <select value={this.state.ubicacionRecogidaSeleccionada} onChange={this.handleUbicacionRecogidaChange}>
                        <option value={0}>Seleccione...</option>
                        {this.state.ubicacionesRecogida.map(ubicacion =>
                            <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.ubicacion}</option>
                        )}
                    </select>
                </div>

                <div>
                    <label>Ubicacion Devolucion:</label>
                    <select value={this.state.ubicacionDevolucionSeleccionada} onChange={this.handleUbicacionDevolucionChange}>
                        <option value={0}>Seleccione...</option>
                        {this.state.ubicacionesDevolucion.map(ubicacion =>
                            <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.ubicacion}</option>
                        )}
                    </select>
                </div>

                <button onClick={this.handleBuscarClick}>Buscar</button>

                {contents}

                <h2>Registrar nuevo vehiculo</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Referencia del vehiculo:
                        <select value={this.state.referenciaVehiculoSeleccionado} onChange={this.handleReferenciaVehiculoChange}>
                            <option value="">Seleccione...</option>
                            {this.state.vehiculos.map(vehiculo =>
                                <option key={vehiculo.id} value={vehiculo.referencia}>{vehiculo.referencia}</option>
                            )}
                        </select>
                    </label>
                    <br />
                    <label>
                        Lugar de recogida:
                        <select value={this.state.ubicacionRecogidaSeleccionada} onChange={this.handleUbicacionRecogidaChange}>
                            <option value={0}>Seleccione...</option>
                            {this.state.ubicacionesRecogida.map(ubicacion =>
                                <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.ubicacion}</option>
                            )}
                        </select>
                    </label>
                    <br />
                    <label>
                        Lugar de devolucion:
                        <select value={this.state.ubicacionDevolucionSeleccionada} onChange={this.handleUbicacionDevolucionChange}>
                            <option value={0}>Seleccione...</option>
                            {this.state.ubicacionesDevolucion.map(ubicacion =>
                                <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.ubicacion}</option>
                            )}
                        </select>
                    </label>
                    <br />
                    <input type="submit" value="Registrar vehiculo" />
                </form>
            </div>
        );
    }

    handleUbicacionRecogidaChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        this.setState({ ubicacionRecogidaSeleccionada: selectedValue });
    }

    handleUbicacionDevolucionChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        this.setState({ ubicacionDevolucionSeleccionada: selectedValue });
    }

    handleReferenciaVehiculoChange = (event) => {
        this.setState({ referenciaVehiculoSeleccionado: event.target.value });
    }

    handleBuscarClick = async () => {
        const { ubicacionRecogidaSeleccionada, ubicacionDevolucionSeleccionada } = this.state;
        const url = `api/estado?idUbicacionRecogida=${ubicacionRecogidaSeleccionada}&idUbicacionDevolucion=${ubicacionDevolucionSeleccionada}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ estado: data });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { referenciaVehiculoSeleccionado, ubicacionRecogidaSeleccionada, ubicacionDevolucionSeleccionada, vehiculos } = this.state;
        const vehiculoSeleccionado = vehiculos.find(vehiculo => vehiculo.referencia === referenciaVehiculoSeleccionado);

        try {
            const response = await fetch('api/estado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IdVehiculo: vehiculoSeleccionado.id,
                    IdUbicacionRecogida: ubicacionRecogidaSeleccionada,
                    IdUbicacionDevolucion: ubicacionDevolucionSeleccionada
                })
            });

            if (response.ok) {
                // Refresca la grilla después de guardar el vehículo exitosamente
                await this.handleBuscarClick();

                // Restablece los valores de los filtros a su estado inicial
                this.setState({
                    referenciaVehiculoSeleccionado: '',
                    ubicacionRecogidaSeleccionada: 0,
                    ubicacionDevolucionSeleccionada: 0
                });
                alert('Vehículo registrado correctamente.');
            } else {
                alert('Error al registrar el vehículo.');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al enviar la solicitud.');
        }
    }




    async populateUbicacionesData() {
        const response = await fetch('api/ubicaciones');
        const data = await response.json();
        this.setState({
            ubicacionesRecogida: data,
            ubicacionesDevolucion: data,
            loading: false
        });
    }

    async populateVehiculosData() {
        const response = await fetch('api/vehiculo');
        const data = await response.json();
        console.log(data);
        this.setState({ vehiculos: data, loading: false });
    }
}
