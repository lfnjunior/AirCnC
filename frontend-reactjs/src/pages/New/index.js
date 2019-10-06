import React, { useState, useMemo } from 'react'
import api from '../../services/api'

import camera from '../../assets/camera.svg'

import './styles.css'

export default function New({ history }) {
  //Estados que serão controlados nessa tela
  const [thumbnail, setThumbnail] = useState(null)
  const [company, setCompany] = useState('')
  const [techs, setTechs] = useState('')
  const [price, setPrice] = useState('')
  
  /*fica oservando o valor da variavel preview, quando alterada, retorna com a URL da thumbnail 
    isso para que possa ter o objeto preview para pré visualizar a imagem assim que for feita a seleção no formulário*/
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  },[thumbnail])

  async function handleSumbmit(event) {
    //Para não mudar de pagina
    event.preventDefault()
    //Criando um FormData para envio via Post para a API
    const data = new FormData()
    //Consulta o storage do navegador 
    const user_id = localStorage.getItem('user')
    //Cria o objeto para enviar no formato Multipart Form Data:
    //formato chave e valor
    data.append('thumbnail', thumbnail)
    data.append('company', company)
    data.append('techs', techs)
    data.append('price', price)
    //Parâmetros; 1 - endpoint ; 2 - FormData ; 3 - Header com o Id do usuário logado
    await api.post('/spots', data, {
      headers: { user_id }
    })
    //redireciona para a dashboard
    history.push('/dashboard')
  }

  return (
    <form onSubmit={handleSumbmit/*Evento para envio do formulário quando o botão submit é acionado*/}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` /*Faz uma prévia de visualização da imagem seleiconada*/ }}
        className={thumbnail ? 'has-thumbnail' : '' /*altera aa estilização quando uma imagem está selecionada*/}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0]) 
          /*Abre o selecionador de arquivo, o indice zéro [0] é por que só é selecionado um arquivo apenas, e não múltiplos arquivos */} />
        <img src={camera/*componente importado que contém a imagem de uma camera*/} alt="Select img" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company"
        placeholder="Sua empresa incrível"
        value={company
          /*foi criado um estado para cada input.
            E o react vai fazer a alteração do estado sempre que houver mudança no input 
            através do metodo onChange*/}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input 
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
      <input 
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}