import React from "react";
import { EventBody } from './Components/eventBody'
import { useState } from 'react';
import { NavBar } from './Components/navBar';
import { DragDropContext} from "react-beautiful-dnd";
import { MOVES } from "./constants";
import './temp.css'
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector here
import { Addinlist } from "./Redux/slice";
export default function App() {
  const [moves, setMoves] = useState(MOVES);
  const [actions, setActions]= useState([]);
  const [actions2, setActions2]= useState([]);
  const dispatch = useDispatch(); // Fixed typo: changed 'usediapatch' to 'useDispatch'
  const Arryfor = useSelector ((state) => state.storedetails.Arrytostore)
  const onHandleDragEnd = (result) =>{
    const {source, destination} = result;
    console.log(source, destination)
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add , 
      active = moves,
      complete = actions,
      complete2 = actions2; 

    // take a move to drag and drop 
    add = active[source.index];

    // Destination Logic
    if (destination.droppableId === "MovesActions") {
      // add the move to action 1
      complete.push(add);
    } else {
      //add the move to action 2
      complete2.push(add);
    }
    setActions2(complete2);
    setActions(complete);
    setMoves(active);
  }
  
  return (
    <div className="bg-blue-100 font-sans text-center">
      {/* <NavBar/> */}
        <DragDropContext onDragEnd={onHandleDragEnd}>
          <EventBody 
            moves={moves} 
            setMoves={setMoves} 
            actions={actions}
            actions2={actions2}
            setActions2={setActions2}
            setActions={setActions}  
          />
        </DragDropContext>
    </div>
  );
}
