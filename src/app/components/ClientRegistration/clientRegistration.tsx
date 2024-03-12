import React, { ChangeEvent, useState } from "react"
import styles from "./styles.module.css";
import axios from "axios";
import { X } from "@phosphor-icons/react";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  coordinateX: string;
  coordinateY: string;
}

//Component for client registration.
export default function ClientRegistration() {

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    coordinateX: '',
    coordinateY: ''
  });

  // Function to handle form changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setRegistrationSuccess(false);
  };

  // Function to reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      coordinateX: '',
      coordinateY: ''
    });

  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Dados a serem enviados para a rota
    const data = formData;

    // Realizando a requisição com Axios
    axios.post('http://localhost:3333/clients', data)
      .then(() => {
        console.log('Dados salvos com sucesso!');
        setRegistrationSuccess(true);
        resetForm();
      })
      .catch(error => {
        console.error('Erro ao salvar os dados.', error);
      });
  };

  return (
    <main className={styles.main}>
      {registrationSuccess && (
        <>
          <div className={styles.icoContainerSuccess}>
            <X size={34} className={styles.customIcon} onClick={() => setRegistrationSuccess(false)} />
            <div className={styles.containerSuccess}>Cadastro realizado com sucesso!</div>
          </div>
        </>

      )}
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