import { useState } from "react"
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"

type TState = {
    name: string,
    born: string,
    books: string[] | [],
    died: string,
    gender: string,
    titles: any[] | []
}
const initState: TState = {
    name: '',
    born: '',
    books: [''],
    died: '',
    gender: '',
    titles: ['']
}

const FormComponent = () => {
    const [state, setState] = useState<TState>(initState)
    const [modal, setModal] = useState<boolean>(false)
    
    const handleModal = (e: any) => () => {
        setModal(e)
    }

    // const handleClear = () => {
    //     setState(initState)
    // }

    return (
        <div className="form">
            <form onSubmit={(e: any)=> {
                e.preventDefault()
                console.log(state);
                }}>

                <input 
                type="text" 
                placeholder="name" 
                value={state.name} 
                name={'name'} 
                onChange={(e)=> {
                setState({...state, name: e.target.value})
                }}
                />

                <input 
                type="text" 
                placeholder="gender" 
                value={state.gender} 
                name={'gender'} 
                onChange={(e)=> {
                setState({...state, gender: e.target.value})
                }}
                />

                <input 
                type="date" 
                placeholder="born" 
                value={state.born} 
                name={'born'} 
                onChange={(e)=> {
                setState({...state, born: e.target.value})
                }}
                />

                <input 
                type="date" 
                placeholder="died" 
                value={state.died} 
                name={'died'} 
                onChange={(e)=> {
                setState({...state, died: e.target.value})
                }}
                />

                {state.books.map((el, i) => (
                <div key={i}>
                    <input 
                    type="text" 
                    placeholder="books" 
                    value={state.books[i]} 
                    name={'books'+i} 
                    onChange={(e)=> {
                    state.books[i] = e.target.value;
                    setState({...state, books: state.books})
                    }}
                    />
                </div>
                ))}
                <Button 
                onClick={(e: any)=> {
                    const booksS: string[] = state.books;
                    booksS.push('')
                    setState({...state, books: booksS})
                    }}>add book</Button>



                {state.titles.map((el, i) => (
                <div key={i}>
                    <input 
                    type="text" 
                    placeholder="titles" 
                    value={state.titles[i]} 
                    name={'titles'+i} 
                    onChange={(e)=> {
                    state.titles[i] = e.target.value;
                    setState({...state, titles: state.titles})}}
                    />
                </div>
                ))}
                <Button 
                onClick={(e: any)=> {
                    const titlesa: any[] = state.titles;
                    titlesa.push('')
                    setState({...state, titles: titlesa})
                    }}>add titles</Button>

                <Button 
                type={'submit'} 
                onClick={
                    handleModal(true)}
                >submit</Button>

                <Modal 
                show={modal} 
                onHide={
                    handleModal(false)
                    }>
                    <Modal.Header closeButton>
                        <Modal.Title>{state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div>
                                <small className="prop">Name:</small>
                                <span>{state.name}</span>
                            </div>
                            <span className="prop">Born: </span>{state.born}
                            <span className="prop">Books: </span>{state.books.join('\n')}
                            <span className="prop">Died: </span>{state.died}
                            <span className="prop">Gender: </span>{state.gender}
                            <span className="prop">Titles: </span>{state.titles.join('\n')}
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={
                    handleModal(false)
                }>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
    )
}
export default FormComponent