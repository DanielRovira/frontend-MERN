import React, { useState } from 'react';

function Item({ item, updateDocument, deleteDocument }) {

    const [tempText, setTempText] = useState(item.text)
    

    return (
        <div className='row'>
            <input
                type="checkbox"
                defaultChecked={!item.active}
                onClick={() => { updateDocument({...item, active: !item.active}) }}
            />

            {((item.edit) || (item.text === "")) ? (
                <input
                type="text"
                value={tempText} 
                onChange={(e) => setTempText(e.target.value)}
                onBlur={() => updateDocument({...item, text: tempText, edit: false})}
                />
            ) :
                <span
                onClick={() => { updateDocument({ ...item, edit: !item.edit }) }}
                style={item.active ? {} : { textDecoration: "line-through" }}
                >{item.text}</span>
            }
            
            <button onClick={() => { deleteDocument(item) }}>Apagar</button>
        </div>
    )
}

export default Item