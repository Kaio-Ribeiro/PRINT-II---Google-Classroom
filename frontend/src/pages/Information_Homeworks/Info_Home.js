import React, { useState } from 'react'
import {useLocation} from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './Info_Home.css'

function Information_Homework() {
    const history = useHistory()
    const location = useLocation();
    const classID = localStorage.getItem('class_id')
    const homework = location.state.homework

    async function handleEditHomework(homework) {
        history.push({
            pathname: '/editHomework',
            state: {homework}
        })
    }

    async function handleDeleteHomework(id) {
        try {
            if (window.confirm('Quer mesmo deletar essa atividade?')) {
                await api.delete(`/homeworks/${id}`, {
                    headers: {
                        Authorization: classID,
                    }
                })

                alert('Deletado com sucesso.')

                history.push('/homeworks')

              }
        } catch (err) {
            alert('Erro ao deletar, tente novamente.')
        }
    }

    return (
        <div className="Body-InfoHome">
          
          <div class="menu-infohome">
           
              <div class="part1-infohome">
                   <Link class="back-infohome" to="/homeworks"> Voltar </Link>
              </div>

              <div class="list-names-infohome">
                  <div class="item-1-infohome">
                    <a id="instru-infohome" href="">Instruções</a>
                  </div>
              </div>

              <div class="buttons-infohome">
                   <button class="btn-edit-home" onClick={() => handleEditHomework(homework)}>Editar</button>
                   <button class="btn-excl-home" onClick={() => handleDeleteHomework(homework.id)}>Excluir</button>
              </div>

            </div>
            
            <div class="navegacao-infohome">

                <div class="c1">

                      <div class="div1-c1">
                            <h2 class="title-infohome">{homework.title}</h2>
                      </div>

                      <div class="div2-c1">
                            <p id="pmax-ih"> {homework.fullPoints} pontos</p>
                            <p id="dentrega-ih">Data Entrega: {homework.dayLimit}/{homework.monthLimit}/{homework.yearLimit}</p>
                      </div>

                      <div class="div3-c1">
                          <p id="descri-infohome">{homework.description}</p>
                      </div>

                      <div class="div4-c1">
                          Anexos 
                      </div>

                </div>

                <div class="c2">
                    <p id="title-coment">Comentários da turma</p>

                    <input type="text" id="ent-coment-infohome" name="coment-infohome" placeholder="Adicionar comentário para a turma..."/>

                    <button type="button" id="btn-postcoment-infohome">Postar</button>
                </div>

                <div class="c3-listcoment-infohome">
                  
                </div>

            </div>

        </div>
    )
}

export default Information_Homework
