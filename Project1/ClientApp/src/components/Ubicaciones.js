import React, { Component } from 'react';

export class Ubicaciones extends Component {
    static displayName = Ubicaciones.name;

    constructor(props) {
        super(props);
        this.state = { ubicaciones: [], loading: true, nuevaUbicacion: '', nuevoEstado: true };
    }

    componentDidMount() {
        this.populateUbicacionesData();
    }

    render() {
        return (
            <div>
                <h1>Listado de Ubicaciones</h1>
                <p>Visualizacion de ubicaciones.</p>

                <h2>Crear Nueva Ubicacion</h2>
                <form onSubmit={this.handleCrearUbicacion}>
                    <div className="form-group">
                        <label>Ubicacion:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nuevaUbicacion}
                            onChange={this.handleUbicacionChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Estado:</label>
                        <select
                            className="form-control"
                            value={this.state.nuevoEstado}
                            onChange={this.handleEstadoChange}
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>

                <hr />

                {this.state.loading ?
                    <p><em>Loading...</em></p> :
                    this.renderUbicacionesTable(this.state.ubicaciones)
                }
            </div>
        );
    }

    handleUbicacionChange = (event) => {
        this.setState({ nuevaUbicacion: event.target.value });
    }

    handleEstadoChange = (event) => {
        this.setState({ nuevoEstado: event.target.value === 'true' });
    }

    handleCrearUbicacion = async (event) => {
        event.preventDefault();

        const response = await fetch('api/ubicaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ubicacion: this.state.nuevaUbicacion,
                estado: this.state.nuevoEstado
            })
        });

        if (response.ok) {
            await this.populateUbicacionesData();
            this.setState({ nuevaUbicacion: '', nuevoEstado: true });
        } else {
            console.error('Error al insertar ubicacion.');
        }
    }

    async populateUbicacionesData() {
        const response = await fetch('api/ubicaciones');
        const data = await response.json();
        this.setState({ ubicaciones: data, loading: false });
    }

    renderUbicacionesTable(ubicaciones) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ubicacion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ubicaciones.map(ubicacion =>
                        <tr key={ubicacion.id}>
                            <td>{ubicacion.id}</td>
                            <td>{ubicacion.ubicacion}</td>
                            <td>{ubicacion.estado ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button onClick={() => this.handleEditarEstado(ubicacion.id, !ubicacion.estado)}>
                                    Cambiar Estado
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    handleEditarEstado = async (id, nuevoEstado) => {
        const response = await fetch(`api/ubicaciones/${id}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: nuevoEstado
            })
        });

        if (response.ok) {
            await this.populateUbicacionesData();
        } else {
            console.error('Error al editar estado.');
        }
    }
}
