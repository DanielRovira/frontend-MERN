import './App.css';
import { useEffect, useState } from 'react';
import Item from './components/item'

function App() {

const [itens, setItens] = useState([])

    function getData() {
        fetch('http://localhost:3000/todo/list', { method:"GET" })
        .then(response => response.json())
        .then(data => setItens(data))
    };

    useEffect(() => {
        getData()
    },[])

  return (
    <div className="wrapper">
        <h1>To Do App</h1>

        {itens.map(item => {
                return <Item key={item._id} item={item} />
            })
        }

        <button>Todos</button>
        <button>Pendentes</button>
        <button>Concluídos</button>

        <button>Inserir novo To-do</button>

    </div>
  );
}

export default App;
