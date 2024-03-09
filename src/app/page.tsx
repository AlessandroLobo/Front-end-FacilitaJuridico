'use client'

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import ModalInfo from './components/ModalInfo/modalInfo';
import ClientRegistration from './components/ClienteRegistration/cientRegistration';

// Interface para definir o tipo dos dados do cliente
interface IClient {
  id: string
  name: string;
  email: string;
  phonenumber: string;
  coordinatex: number;
  coordinatey: number;
}

export default function Home() {

  const [modalOpen, setModalOpen] = useState(false);

  // Definindo a tipagem para clientList como um array de Clientes
  const [clientList, setClientList] = useState<IClient[]>([]);

  useEffect(() => {
    // Realizando a requisição GET para obter os dados dos clientes
    fetch('http://localhost:3333/clients/')
      .then(response => {
        if (response.ok) {
          return response.json(); // Transforma a resposta em JSON
        } else {
          throw new Error('Erro ao obter os dados dos clientes.');
        }
      })
      .then(data => {
        if (Array.isArray(data.clients)) {
          console.log(data.clients);
          setClientList(data.clients); // Atualiza o clientList com os dados recebidos
        } else {
          console.error('Os dados recebidos não contêm um array de clientes:', data);
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }, []);

  return (
    <main className={styles.main}>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ClientRegistration />
      </ModalInfo>
      <div className={styles.div}>
        <div className={styles.box} onClick={() => setModalOpen(true)}>
          <h1>Cadastro</h1>
        </div>
        <div className={styles.box}>
          <h1>Rotas</h1>
        </div>

      </div>

      <div className={styles.containerTable}>
        <div className={styles.containerLabelInput}>
          <label htmlFor="name" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            placeholder="Digite seu nome"
            className={styles.input}
          />
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
