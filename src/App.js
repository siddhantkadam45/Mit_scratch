import React from "react";
import { EventBody } from './Components/eventBody'
import { useState } from 'react';
import ToolBar from './Components/toolBar';
import { DragDropContext} from "react-beautiful-dnd";
import { MOVES } from "./constanst";

export default function App() {
  const [moves, setMoves] = useState(MOVES);
  const [actions, setActions]= useState([]);
 
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
      complete = actions;
    
    if (source.droppableId === "MovesList") {
      add = active[source.index];
    }

    // Destination Logic
    if (destination.droppableId === "MovesList") {
      active.splice(source.index, 1);
      active.splice(destination.index, 0, add);
    } else {
      complete.push(add);
    }
    setActions(complete);
    setMoves(active);
  }
  
  return (
    <div className="bg-blue-100 font-sans text-center">
      <ToolBar/>
        <DragDropContext onDragEnd={onHandleDragEnd}>
          <EventBody 
            moves={moves} 
            setMoves={setMoves} 
            actions={actions}
            setActions={setActions}  
          />
        </DragDropContext>
    </div>
  );
}
