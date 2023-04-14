import React, {useState, useEffect} from 'react';

const Card = (props) => {    
    const [hide, setHide] = useState('hide');
    const [text, setText] = useState('');
    const [form, setForm] = useState({
        name: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }

    const handler = (e) => {
        e.preventDefault();
        if(form.name) {
            setHide('hide');
            setText(form);
            props.newC ? props.setNewC(false): props.setNewC(true);
            e.target.querySelector('.input').value = '';
        };
    };

    useEffect(() => {
        let isLoading = true;
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'id': crypto.randomUUID(),'context': text.name})
        };
        if(isLoading && text.name && String(text.name).trim()) {
            fetch('http://localhost:7070/notes', params)
                .then(data => {console.log(data)});
        };
        return () => {isLoading = false};
    }, [text.name]);

    return <div className='card' id={props.id} onClick={() => {setHide('')}}>
        <div className={props.context ? 'remove': 'remove hide'} 
            onClick={props.remove}>
        </div>
        <form autoComplete='off' onSubmit={handler}>
            <input type="text"
                className={`input ${hide}`}
                name='name'
                onChange={handleChange}
                disabled={props.context ? 'disabled': ''}
            />
            <button className={props.context ? 'hide': `send ${hide}`}></button>
        </form>
        <div>{props.context ? props.context: ''}</div>
    </div>
}

export default Card;
