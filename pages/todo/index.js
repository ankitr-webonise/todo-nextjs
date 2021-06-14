
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import AddTodo from "../../containers/addTodo";
import TodoList from "../../containers/todoList";
import axios from "axios";
export default function Home () {
    const [todos, setTodos] = useState( [] );
    useEffect( async () => {
        const result = await axios.get( "https://jsonplaceholder.typicode.com/posts?userId=10" );
        setTodos( result?.data );
    }, [] );
    const addTodo = async ( todoText ) => {
        if ( todoText && todoText.length > 0 ) {
            const result = await axios.post( "https://jsonplaceholder.typicode.com/posts", {
                title: todoText,
                body: 'bar',
                userId: 10,
            } );
            setTodos( [...todos, result?.data] );
        }
    };
    const deleteTodoItem = async ( todo ) => {
        if ( confirm( "Do you really want to delete this item?" ) ) {
            await axios.delete( "https://jsonplaceholder.typicode.com/posts/" + todo.id );
            const newTodos = todos.filter( ( _todo ) => _todo.id !== todo.id );
            setTodos( newTodos );
        }
    };
    const editTodoItem = async ( todo ) => {
        const newTodoText = prompt( "Enter new todo text or description:" );
        alert( newTodoText )
        if ( newTodoText != null ) {
            const result = await axios.put( "https://jsonplaceholder.typicode.com/posts/" + todo.id, {
                title: newTodoText,
            } );
            const moddedTodos = todos.map( ( _todo ) => {
                if ( _todo.id === todo.id ) {
                    return result?.data;
                } else {
                    return _todo;
                }
            } );
            setTodos( moddedTodos );
        }
    };
    return (
        <div>
            <Head>
                <title>ToDo app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="main">
                <AddTodo addTodo={addTodo} />
                <TodoList
                    todos={todos}
                    deleteTodoItem={deleteTodoItem}
                    editTodoItem={editTodoItem}
                />
            </main>
        </div>
    );
}