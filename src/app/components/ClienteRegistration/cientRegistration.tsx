import React, { ChangeEvent, useState } from "react"
import styles from "./styles.module.css";
import ModalInfo from "../ModalInfo/modalInfo";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  coordinateX: string;
  coordinateY: string;
}

export default function ClientRegistration() {

  const [modalOpen, setModalOpen] = useState(false);


  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    coordinateX: '',
    coordinateY: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Dados a serem enviados para a rota
    const data = formData;

    // Opções para a requisição
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    // Realizando a requisição
    fetch('http://localhost:3333/clients', options)
      .then(response => {
        if (response.ok) {
          console.log('Dados salvos com sucesso!');
          setModalOpen(true);
        } else {
          console.error('Erro ao salvar os dados.');
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  return (
    <main className={styles.main}>
      <ModalInfo isOpen={modalOpen} setIsOpen={setModalOpen}>
        <label>Dados salvos com sucesso</label>
      </ModalInfo>
      <div className={styles.formContainer}>
        <div className={styles.containerLabelInput}>
          <label htmlFor="name" className={styles.label}>Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            className={styles.input}
          />
        </div>

        <div className={styles.containerLabelInput}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
            className={styles.input}
          />
        </div>

        <div className={styles.containerLabelInput}>
          <label htmlFor="phoneNumber" className={styles.label}>Telefone:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            className={styles.input}
          />
        </div>

        <div className={styles.containerLabelInput}>
          <label htmlFor="coordinateX" className={styles.label}>Coordenada X:</label>
          <input
            type="text"
            id="coordinateX"
            name="coordinateX"
            value={formData.coordinateX}
            onChange={handleChange}
            placeholder="Digite a coordenada X"
            className={styles.input}
          />
        </div>

        <div className={styles.containerLabelInput}>
          <label htmlFor="coordinateY" className={styles.label}>Coordenada Y:</label>
          <input
            type="text"
            id="coordinateY"
            name="coordinateY"
            value={formData.coordinateY}
            onChange={handleChange}
            placeholder="Digite a coordenada Y"
            className={styles.input}
          />
        </div>

        <button onClick={handleSubmit} className={styles.button}>Salvar</button>
      </div>
    </main>
  )
}