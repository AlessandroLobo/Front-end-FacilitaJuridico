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
      <div>

        <ul className={`${styles.clientList} ${styles.horizontalList}`}>
          {clientList.length > 0 ? (
            <>
              <li className={styles.clientHeader}>
                <p>Nome</p>
                <p>Email</p>
                <p>Tel</p>
                <p>Coord X</p>
                <p>Coord Y</p>
              </li>
              {clientList.map((client) => (
                <li key={client.id} className={styles.clientItem}>
                  <p>{client.name}</p>
                  <p>{client.email}</p>
                  <p>{client.phonenumber}</p>
                  <p>{client.coordinatex}</p>
                  <p>{client.coordinatey}</p>
                </li>
              ))}
            </>
          ) : (
            <p>{clientList.length === 0 ? 'Nenhum cliente encontrado.' : 'Ainda carregando dados...'}</p>
          )}
        </ul>
      </div>
    </main>
  );
}
