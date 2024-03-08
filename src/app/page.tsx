import React from 'react';
import styles from "./page.module.css";


export default function Home() {


  return (

    <main className={styles.main}>
      <div className={styles.div}>
        <div className={styles.box}>
          <h1>Rotas</h1>
        </div>
        <div className={styles.box}>
          <h1>Cadastro</h1>
        </div>
      </div>
    </main>
  );
}
