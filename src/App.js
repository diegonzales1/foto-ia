import React, { useState } from 'react'
import './App.css'
import {ReactComponent as Robot} from '../src/images/robot.svg'
import GifCarregando from '../src/images/carregando.gif'

 function App() {
  const  [ carregando, setCarregando ] = useState ( false )
  const  [ pessoas,    setPessoas    ] = useState ( [] )
  const  [ etnia,      setEtnia      ] = useState ( '' )
  const  [ idade,      setIdade      ] = useState ( '' )
  const  [ cabelo,     setCabelo     ] = useState ( '' )

  async function obterFotos() {
    setCarregando( true )
    let apiKey = process.env.REACT_APP_API_KEY

    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''
    const filtraCabelo = cabelo.length > 0 ? `&hair_color=${cabelo}` : ''

    let url = `https://api.generated.photos/api/v1/faces?api_key=${apiKey}${filtraEtnia}${filtraIdade}${filtraCabelo}&order+by=random`

    await fetch(url)
    .then(response => response.json())
    .then( data => {
      setPessoas(data.faces)
    })
    .catch(function (error) {
      console.log(`Houve um erro: ${error.message}`)
    })
    setCarregando(false)
  } 

  function ListaPessoas ( props ) {
    const dados = props.dados
    const listagemPessoas = dados.map( (pessoa) => 
    <img key = { pessoa.id } src={ pessoa.urls[4][512] } title={ pessoa.meta.age[0] }/>
     )
     return (
      <ul>{ listagemPessoas }</ul>
     )
  }

  return (
    <div class = " principal ">
      <h1> Gerador de Fotos com IA</h1>
      {pessoas.length > 0
      ? <ListaPessoas dados = { pessoas } />
      : <Robot />
      }
        { carregando &&
       <img src = {GifCarregando} title= "Carregando..." alt= "Aguarde! Carregando dados"></img>
      }
      <div className = "opcoes">
        <label>Etnia:</label>
        <select onChange= { event => setEtnia(event.target.value) }>
          <option value="">Todas</option>
          <option value="white">Branco</option>
          <option value="latino">Latino</option>
          <option value="asian">Asiático</option>
          <option value="black">Negro</option>
        </select>

        <label>Faixa etária:</label>
        <select onChange= { event => setIdade(event.target.value) }>
          <option value="">Todas</option>
          <option value="infant">Bebê</option>
          <option value="child">Criança</option>
          <option value="young-adult">Jovem</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Idoso</option>
        </select>

        <label>Cor do cabelo:</label>
        <select onChange= { event => setCabelo(event.target.value) }>
          <option value="">Todas</option>
          <option value="brown">Castanho</option>
          <option value="blond">Loira</option>
          <option value="black">Preto</option>
          <option value="gray">Grisalho</option>
          <option value="red">Vermelho</option>
        </select>
      </div>


      <button type= "button" onClick= { obterFotos }>
      Obter Imagens 
     </button>
     {pessoas.length > 0 &&
     <button type= "button" onClick= {() => 
      {
        setPessoas( [] )
        setIdade  ( '' )
        setEtnia  ( '' )
        setCabelo ( '' )
      }}>
       Limpar Resultados
     </button>
    }
    </div>
  )
}

export default App
