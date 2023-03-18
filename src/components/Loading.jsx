import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ loading }) => {
  const [tempo, setTempo] = React.useState(5);
  const decresce = setInterval(() => {
    setTempo(tempo - 1);
  }, 1000);
  if (!loading) {
    clearInterval(decresce);
  }
  return <span className={styles.temporizador}>{tempo}</span>;
};

export default Loading;
