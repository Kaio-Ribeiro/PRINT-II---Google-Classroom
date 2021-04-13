import React, { useState } from 'react'
import {useLocation} from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './Edit_Home.css'

function Edit_Homework() {
  return (
      <div className="Body-EditHome">
        <div class="menu-edit-atividades"> 

          <div class="part1-edit-atvd">
              <a class="close-edit-atvd" href="">
                X
              </a>

              <label class="label-edit-atvd">Editar Atividade</label>
          </div>

          <div class="save-edit-atv">
              <button class="btn-save-atvd">Salvar</button>
          </div>

        </div>

        <div class="navegacao-edit-atvd">

          <form class="form-edit-atvd">

            <div class="edit-info1-atvd">
                <input type="text" id="edit-title-atvd" placeholder="Titulo" name="tAtv"/> <br/>

                <textarea type="text" id="edit-description-atvd" name="dAtv" placeholder="Instruções (opcional)"></textarea> <br/>
                
                <div class="list-anexos-edition">
                  
                </div>

                <button id="anexo-edit-atvd" type="submit">Adicionar Arquivos</button>

            </div>

            <div class="edit-info2-atvd">

                <label class="pont-Max-edition">Pontuação Máxima</label> <br></br>
                <input type="text" name="pMaxAtv" id="pont-max-edition"/> <br></br>

                <label class="data-Ent-edition">Data de Entrega</label> <br></br>
                <input type="date" id="data-ent-edition" name="dataEntrega" value=""/>

            </div>

          </form>

        </div>

      </div>

  )
}

export default Edit_Homework
