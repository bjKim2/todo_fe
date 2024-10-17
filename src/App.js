import {useEffect, useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";
function App() {

  const [todoList, setTodoList] = useState([]);
  const [todoValue,setTodoValue] = useState("");
  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("rrrrrrrr",response);
    setTodoList(response.data.data);
  }
  const addTask = async () => {
    try{
      const response = await api.post("/tasks",{task:todoValue, isCompleted:false});
      if (response.status === 200){
        console.log('성공')
        getTasks();
        setTodoValue("");
      }else{
        throw new Error("실패")
      }

    }catch(e){
      console.log("error",e);
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await api.delete('/tasks/' + id);
      if (response.status === 200) {
        console.log('삭제 성공')
        getTasks();
      } else {
        throw new Error("실패")
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  const upf = async (id) => {
    try {
      const response = await api.put('/tasks/' + id);
      if (response.status === 200) {
        console.log('업뎃 성공')
        getTasks();
      } else {
        throw new Error("실패")
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  // 앱이 딱 켜졌을때 실행되는 함수
  useEffect(() => { 
    getTasks();
  },[]);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value = {todoValue}
            onChange = {(event) => setTodoValue(event.target.value)}
            
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} delf={deleteTask} upf={upf} />
    </Container>
  );
}

export default App;
