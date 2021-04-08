import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './mural.css';

function Mural() {
    const [description, setDescription] = useState('')

    const history = useHistory()
    const location = useLocation();
    const classroom = JSON.parse(localStorage.getItem('classroom'));
    const classID = localStorage.getItem('class_id')
    const userID = localStorage.getItem('userID')
    const [posts,setPosts] = useState([])
    const [contents_attachments,setContents_attachments] = useState([])
    const [files, setFiles] = useState([])

    function logout() {
        history.push('/');
    }

    function handleSelectFiles(event) {
        if(!event.target.files) {
            return;
        }

        const selectedFiles = Array.from(event.target.files)
        setFiles(selectedFiles)
    }

    async function handleCreatePost(event) {
        event.preventDefault()

        const data = new FormData()

        data.append('classID', classID)
        data.append('description', description)

        files.forEach(file => {
            data.append('files', file)
        })

        try{
            await api.post('/posts', data, {
                headers: {
                    Authorization: userID
                }
            })
    
            alert('Postagem criada!')

        }catch(err) {
            alert('Erro ao criar postagem')
        }
    }

    useEffect(() => {
        api.get('posts', {
        headers: {
            Authorization: userID,
        }
        },{

        }).then(response => {
            setPosts(response.data)
        })
    }, [userID])

    return (
        <div>
            <div className="menu-suspenso">

                <div className="part1">
                    
                    <Link className="turmas-menu" to="/dashboard">
                        Turmas
                    </Link>

                </div>

                <div className="list-names-center">
                    <div className="item-1">
                        <Link id="mural-menu" to="/mural">Mural</Link>
                    </div>

                    <div className="item-2">
                        <Link id="atividades-menu" to="/homeworks">Atividades</Link>
                    </div>

                    <div className="item-3">
                        <Link id="pessoas-menu" to="/persons">Pessoas</Link>
                    </div>

                    <div className="item-4">
                        <a id="notas-menu" href="">Notas</a>
                    </div>
                </div>


                <div className="logout-mural">
                    <button className="btn-logout-menu-suspenso" onClick={logout}>Logout</button>
                </div>
                
                </div>
            
            <div className="navegacao">
                <div className="container-mural">

                    <div className="text-container-one">
                    <h1 className="nome-turma-mural">{classroom.title}</h1>
                    <h3 className="codigo">Código da turma: {classroom.code}</h3>
                    </div>
                </div>


                <form className="container-four"onSubmit={handleCreatePost}>
                    <p className="text-comunic">Comunique-se com sua turma aqui !</p>

                    <textarea 
                        id="descri-postagem" 
                        placeholder="Escreva um aviso para sua turma"
                        value={description} onChange={e => setDescription(e.target.value)} 
                    >

                    </textarea>

                    <input type="file" multiple onChange={handleSelectFiles} id="anexar-doc-mural[]" name="doc-mural"></input>

                    <button type="submit" id="postar-mural" name="postagem-mural">Postar</button>


                </form>

                <div className="mural-postagens">
                    <ul>
                        {posts.map(post => (
                            <li className="li-posts" key={post.id}>
                            
                                <div className="posts-listing">
                                    <strong>{post.user_name}</strong>
                                    <p className='date-time'>{post.hours} {post.day}/{post.month}/{post.year}</p>
                                    <p>{post.description}</p>

                                    <div>
                                        {post.contents_attachments.map(attachment => (
                                            //console.log(attachment.id)
                                           //<img key={attachment.id} src={attachment.url} alt=""width="60" height="40"></img>
                                           //<embed key={attachment.id} src={attachment.url} type="jpg"/>
                                           //<a key={attachment.id} href={attachment.url}>
                                               //<img src="../../images/background.png" alt="img" />
                                           //</a>
                                           <a key={attachment.id} href={attachment.url}>{attachment.url}</a>
                                           
                                            
                                        ))}
                                    </div>
                                </div>
                            
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Mural;