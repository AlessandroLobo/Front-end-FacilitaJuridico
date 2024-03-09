'use client'

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import ModalInfo from './components/ModalInfo/modalInfo';
import ClientRegistration from './components/ClientRegistration/clientRegistration';
import axios from 'axios';
import ClientsRoutes from './components/ClientsRoutes/ClientesRoutes';

// Interface para definir o tipo dos dados do cliente
interface IClient {
  id: string
  name: string;
  email: string;
  phonenumber: string;
  coordinatex: number;
  coordinatey: number;
}

interface FormData {
  searchClient: string
}


export default function Home() {

  const [modalOpen, setModalOpen] = useState(false);

  const [clientRegistrationOpen, setClientRegistrationOpen] = useState(false);

  const [clienteRoutesOpen, setClienteRoutesOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    searchClient: "",
  });

  const [clientList, setClientList] = useState<IClient[]>([]);



  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFormData({ ...formData, searchClient: value });
  }



  const handleSearch = () => {
    const searchTerm = formData.searchClient;
    console.log('searchClient', formData.searchClient);

    axios.get('http://localhost:3333/clients', {
      params: {
        searchTerm
      }
    })
      .then(response => {
        if (response.status === 200) {
          const clients = response.data.clients; // Access the clients array within the response object
          setClientList(clients);
        } else {
          throw new Error('Erro ao obter os dados dos clientes.');
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }

  function handleModalClienteRegistration() {
    setClienteRoutesOpen(false);
    setClientRegistrationOpen(true);
    setModalOpen(true);
  }
  function handleModalClienteRoutes() {
    setClientRegistrationOpen(false);
    setClienteRoutesOpen(true);
    setModalOpen(true);
  }

  useEffect(() => {
    handleSearch()
  }, [])


  return (
    <main className={styles.main}>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        {clientRegistrationOpen && <ClientRegistration />}
        {clienteRoutesOpen && <ClientsRoutes />}
      </ModalInfo>
      <div className={styles.div}>
        <button className={styles.box} onClick={() => {
          handleModalClienteRegistration()
        }}>
          <h1>Cadastro</h1>
        </button>
        <button className={styles.box} onClick={() => {
          handleModalClienteRoutes()
        }}>
          <h1>Rotas</h1>
        </button>
      </div>

      <div className={styles.containerTable}>
        <div className={styles.containerLabelInput}>
          <label htmlFor="name" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.searchClient}
            onChange={handleSearchChange}
            placeholder="Digite seu nome"
            className={styles.input}
          />
          <button onClick={handleSearch} className={`${styles.button} ${styles.buttonHover}`}>Buscar</button>

        </div>

        <div>
          <table className={styles.clientList}>
            <thead>
              <tr className={styles.clientHeader}>
                <th>Nome</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Coord X</th>
                <th>Coord Y</th>
              </tr>
            </thead>
            <tbody>
              {clientList.length > 0 ? (
                clientList.map((client) => (
                  <tr key={client.id} className={styles.clientItem}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phonenumber}</td>
                    <td>{client.coordinatex}</td>
                    <td>{client.coordinatey}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>{clientList.length === 0 ? 'Nenhum cliente encontrado.' : 'Ainda carregando dados...'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
