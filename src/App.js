import './App.css';
import { useEffect, useState } from 'react';
import Item from './components/item'

function App() {

const [itens, setItens] = useState([])
const [filterItens, setFilterItens] = useState({ filter: false, active: false });

    function getData() {
        fetch('http://localhost:3000/todo/list', { method:"GET" })
        .then(response => response.json())
        .then(data => setItens(data))
    };

    function insertDocument() {
        fetch('http://localhost:3000/todo/add',
        {
            method:"POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({"text": "", "active": true})
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function updateDocument(item) {
        fetch('http://localhost:3000/todo/update',
        {
            method:"PATCH",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function deleteDocument(item) {
        fetch('http://localhost:3000/todo/delete',
        {
            method:"DELETE",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    useEffect(() => {
        getData()
    },[])

    const itensToSow = filterItens.filter ? itens.filter(item => item.active === filterItens.active) : itens

  return (
    <div className="wrapper">
        <div>
            
            <h1>To Do App</h1>

            <div className="buttonRow">
                <button
                onClick={() => setFilterItens({ filter: false })} 
                style={ filterItens.filter ? {} : {fontWeight: "bold"} }
                >Todos</button>
                <button
                onClick={() => setFilterItens({ filter: true, active: true })}
                style={ filterItens.filter && filterItens.active ? {fontWeight: "bold"} : {} }
                >Pendentes</button>
                <button
                onClick={() => setFilterItens({ filter: true, active: false })}
                style={ filterItens.filter && !filterItens.active ? {fontWeight: "bold"} : {} }
                >Concluídos</button>
            </div>
            
            {itensToSow.map(item => {
                    return <Item key={item._id} item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} />
                })
            }

            <div className="buttonRow">
                <button onClick={insertDocument}>Inserir novo To-do</button>
            </div>

        </div>
    </div>
  );
}

export default App;
