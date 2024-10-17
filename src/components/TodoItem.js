import {React,useState} from "react";
import { Col, Row } from "react-bootstrap";


const TodoItem = ({item,upf,delf}) => {
  const [hover,setHover] = useState("button-delete");
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button className={"button-delete" } onClick={() => delf(item._id)} >삭제</button>
            <button className={item.isComplete ? "button-delete" : "button-complete" } onClick={() => upf(item._id)}>끝남</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
