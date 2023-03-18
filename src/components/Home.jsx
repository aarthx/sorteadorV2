import React from 'react';
import styles from './Home.module.css';
import { ReactComponent as Girl } from '../assets/girl.svg';
import { ReactComponent as Girl2 } from '../assets/girl2.svg';
import Loading from './Loading';

const Home = () => {
  const [quantidade, setQuantidade] = React.useState(1);
  const [intervalo, setIntervalo] = React.useState([1, 100]);
  const [crescente, setCrescente] = React.useState(false);
  const [contagem, setContagem] = React.useState(false);
  const [sorteados, setSorteados] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const botao = React.useRef();

  function sorteiaNumeros() {
    setSorteados([]);
    let max;
    let min;
    let numeros = [];
    if (intervalo[0] <= intervalo[1]) {
      min = intervalo[0];
      max = intervalo[1];
    } else {
      min = intervalo[1];
      max = intervalo[0];
    }
    if (max - min + 1 < quantidade) {
      return alert(
        'A quantidade de números sorteados deve ser menor que o intervalo de números!',
      );
    }
    for (let i = 0; i < quantidade; i++) {
      let numeroSorteado = Math.floor(Math.random() * (max + 1 - min) + min);
      while (numeros.includes(numeroSorteado)) {
        numeroSorteado = Math.floor(Math.random() * (max + 1 - min) + min);
      }
      numeros.push(numeroSorteado);
    }
    if (crescente) {
      numeros.sort((a, b) => a - b);
    }
    if (contagem) {
      botao.current.disabled = 'true';
      setLoading(true);
      setTimeout(() => {
        botao.current.disabled = '';
        setLoading(false);
        return setSorteados([...numeros]);
      }, 5000);
    } else {
      setSorteados([...numeros]);
    }
  }

  return (
    <main className={styles.mainContainer}>
      <Girl />
      <div className={styles.mainContent}>
        <h1>Sorteador</h1>
        <div>
          <p className={styles.numBox}>
            Sortear{' '}
            <input
              type="number"
              min={1}
              max={100}
              value={quantidade}
              onChange={({ target }) => setQuantidade(parseInt(target.value))}
            />{' '}
            número(s)
          </p>
        </div>
        <div>
          <p className={styles.numBox}>
            Entre{' '}
            <input
              type="number"
              min={1}
              value={intervalo[0]}
              onChange={({ target }) =>
                setIntervalo([parseInt(target.value), intervalo[1]])
              }
            />{' '}
            e{' '}
            <input
              type="number"
              min={1}
              value={intervalo[1]}
              onChange={({ target }) =>
                setIntervalo([intervalo[0], parseInt(target.value)])
              }
            />
          </p>
        </div>
        <div className={styles.checkOptions}>
          <input
            type="checkbox"
            name="crescente"
            id="crescente"
            checked={crescente}
            onChange={({ target }) => setCrescente(target.checked)}
          />
          <label htmlFor="crescente">
            Colocar número(s) em ordem crescente
          </label>
          <input
            type="checkbox"
            name="contagem"
            id="contagem"
            checked={contagem}
            onChange={({ target }) => setContagem(target.checked)}
          />
          <label htmlFor="contagem">Adicionar contagem regressiva</label>
        </div>
        <button onClick={sorteiaNumeros} ref={botao}>
          SORTEAR
        </button>
        <ul className={styles.sorteados}>
          <Girl2 />
          {loading ? (
            <Loading loading={loading} />
          ) : (
            sorteados.map((num) => <li key={num}>{num}</li>)
          )}
        </ul>
      </div>
    </main>
  );
};

export default Home;
