import * as React from 'react';
import { SingleAction } from './singleAction';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import {Sprites} from './spriteProps';
import Positions from './positons';
import Resize from './resize';
import Draggable1 from 'react-draggable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { WARN_MSG_POS, WARN_MSG_SIZE } from '../constants';

export const EventBody = (props) => {
    const {
        moves,
        setMoves,
        actions,
        setActions,
        setActions2, 
        actions2
    } = props;

    const ref = React.useRef();
    const ref2 = React.useRef();

    /// r, t values corresspond to right , top values  
    let r = '0%';
    let t = '0%';
    let scale = 1;
    let angle = 0;
    let r2 = '0%';
    let t2 = '0%';
    let scale2 = 1;
    let angle2 = 0;

    const [hello, setHello] = React.useState(false);
    const [hello2, setHello2] = React.useState(false);
    const [theme, setTheme] = React.useState(false);
    const [displayAddIcon, setDisplayAddIcon] = React.useState(true);
    const [sprite, setSprite]= React.useState(require('../Assets/images/cat.png'));
    const [sprite2, setSprite2]= React.useState(null);

    console.log("rendering...");

    function transform(temp, xAxis, ref1){
        let value = temp.toString();
        if(xAxis){
            if(ref1){
                r = value.concat('%')
            } else{
                r2 = value.concat('%')
            }
        } else{
            if(ref1){
                t = value.concat('%')
            } else{
                t2 = value.concat('%')
            }
        }
        ref1 ? ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`
            :ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
    }

    function moveUp (i, ref) {
        //move up top - 50
        setTimeout(()=>{
            let temp = parseInt(ref ? t.slice(0,-1):t2.slice(0,-1));
            temp = temp - 50;
            if(temp<-140){
                refresh(WARN_MSG_POS);
                return
            }
            transform(temp, false, ref);
        }, (i * 1500));
    }
    function moveDown (i, ref) {  
        //move down top + 50    
        setTimeout(() => {
            let temp = parseInt(ref ? t.slice(0,-1):t2.slice(0,-1));
            temp = temp + 50;
            if(temp>140){
                refresh(WARN_MSG_POS);
                return
            }
           transform(temp, false, ref);
        }, (i * 1500));
    }
    function moveRight (i, ref) {
        //move right right+50
        setTimeout(()=>{
            let temp = parseInt(ref ?r.slice(0,-1):r2.slice(0,-1));
            temp = temp + 50;
            if(temp>290){
                refresh(WARN_MSG_POS);
                return
            }
            transform(temp, true, ref);
        }, (i * 1500));
    }
    function moveLeft(i, ref) {
        //move right right-50 
        setTimeout(() => {
            let temp = parseInt(ref ? r.slice(0,-1):r2.slice(0,-1));
            temp = temp - 50;
            if(temp<-290){
                refresh(WARN_MSG_POS);
                return
            }
            transform(temp, true, ref);
        }, (i * 1500));
    }
    function sayHello(i, ref){
        setTimeout(()=>{
            ref ? setHello(true) : setHello2(true);
        }, (i* 1500));
        //close hello after 1 sec
        closeHello(i,ref);
    }

    function closeHello(i, ref){
        //close hello after 1 sec
        setTimeout(()=>{
            ref? setHello(false):setHello2(false);
        }, (i*1500) +1000);
    }
    function moveXY(xInput, yInput, random, i, ref1) {
        // combined function to move to random postion and to x, y cordinates  
        setTimeout(()=>{
            let tempR = parseInt(ref1 ? r.slice(0,-1) : r2.slice(0,-1));
            let tempT = parseInt(ref1 ? t.slice(0,-1) : t2.slice(0,-1));
            // asign the x, y values 
            // or to random values 
            tempR = tempR !== parseInt(xInput) && parseInt(xInput) !== 0 
                ? (random ? Math.floor((Math.random() * (-290-290)) +290) : parseInt(xInput)) 
                : tempR;
            tempT = tempT !== (-parseInt(yInput)) && parseInt(yInput) !== 0 
                ? (random ? Math.floor((Math.random() * (-140-140)) + 140) : -parseInt(yInput)) 
                : tempT;
            if(parseInt(yInput)==0){
                tempT = 0;
            }
            if (parseInt(xInput)==0){
                tempR = 0;
            }
            //return to intial if it is out of bounds 
            if(tempR<-290 || tempR>290 || tempT<-140 || tempT>140){
                refresh(WARN_MSG_POS);
                return
            }
            let valueR = tempR.toString();
            let valueT = tempT.toString();

            if(ref1){
                r = valueR.concat('%');
                t = valueT.concat('%');
            } else {
                r2 = valueR.concat('%');
                t2 = valueT.concat('%');
            }
            // apply tarnsform for respective sprite
            ref1 ? ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`
                : ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
        }, (i * 1500));
    }
    const rotate = (rAngle,i, ref1) =>{
        setTimeout(() => {
            //rotate the sprite 
            ref1 ? angle += rAngle : angle2+=rAngle;
            // apply tarnsform for respective sprite
            ref1 ? ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`
                : ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
        }, (i * 1500));
    }
    function handleScale(size, increase, idx, ref1){
        //combined function to scale from resize component and resize action item 
        if(size === 'medium'){
            scale =2;
            ref.current.style.transform = `scale(2) translate(${r}, ${t}) rotate(${angle}deg)`;
            return 
        } else if(size === 'large'){
            ref.current.style.transform = `scale(3) translate(${r}, ${t}) rotate(${angle}deg)`;
            scale=3;
            return 
        } else if(size === 'small'){
            ref.current.style.transform = `scale(1) translate(${r}, ${t}) rotate(${angle}deg)`;
            scale=1;
            return 
        } else if(increase) {
            setTimeout(() => {
                ref1 ? scale += 0.2 : scale2 += 0.2;
                if(ref1){
                    if (scale<3){
                        ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`;
                    }else{
                        refresh(WARN_MSG_SIZE);}
                } else{
                    if (scale2<3){
                        ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
                    }else{
                        refresh(WARN_MSG_SIZE);}
                }
            }, idx*1500);
            return
        } else {
            setTimeout(() => {
                ref1 ? scale -= 0.2 : scale2 -= 0.2;
                if(ref1){
                    if (scale>0.5){
                        ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`;
                    }else{
                        refresh(WARN_MSG_SIZE);}
                } else{
                    if (scale2>0.5){
                        ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
                    }else{
                        refresh(WARN_MSG_SIZE);}
                }
            }, idx*1500);
        return
        }
    }

    const startActions = (action, idx, ref) =>{
        switch(action) {
            case 'move x by 50': {
                moveRight(idx, ref);
                break;
            }
            case 'move y by 50': {
                moveUp(idx, ref);
                break;
            }
            case 'move x by -50': {
                moveLeft(idx, ref);
                break;
            }
            case 'move y by -50': {
                moveDown(idx, ref);
                break;
            }
            case 'rotate 45': {
                rotate(45,idx, ref);
                break;
            }
            case 'rotate 90': {
                rotate(90, idx, ref);
                break;
            }
            case 'rotate 135': {
                rotate(135, idx, ref);
                break;
            }
            case 'rotate 180': {
                rotate(180, idx, ref);
                break;
            }
            case 'rotate 360': {
                rotate(360, idx, ref);
                break;
            }
            case 'say hello': {
                sayHello(idx, ref);
                break;
            }
            case 'random position': {
                moveXY(1,1,true, idx, ref);
                break;
            }
            case 'move (0, 0)': {
                moveXY(0,0,false, idx, ref);
                break;
            }
            case 'size decrease': {
                handleScale('', false, idx, ref);
                break;
            }
            case 'size increase': {
                handleScale('', true, idx, ref);
                break;
            }
            case 'repeat': {
                setTimeout(() => {
                    runApp();
                }, idx*1500);
                break;
            }
            default : break; 
        }
    };

    function clearTimeouts(){
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i); 
        }
    }

    const refresh = (msg) => {
        //refresh to intial positions 
        r = '0%';
        t = '0%';
        r2 = '0%';
        t2= '0%';
        scale2=1;
        angle2=0;
        scale=1;
        angle=0;
        clearTimeouts();
        setHello(false);

        //warn message about the boundaries 
        if(msg){
            toast.warn(msg,{
                position: "top-center",
                autoClose: 2000,
                borderRadius:'20px',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle})`;
        ref2.current.style.transform = `scale(${scale2}) translate(${r2}, ${t2}) rotate(${angle2})`;
    };
    
    const runApp = () =>{
        //function to start the actions
        //send true as a parameter if the actions are for the first sprite else false  
        actions && actions.map((item, i) => {startActions(item.todo, i, true); return});
        !displayAddIcon && actions2 && actions2.map((item, i) => {startActions(item.todo, i, false); return});
    };

  return (
  <div className='mainContainer'>
    <ToastContainer />
    <div className="container">
        <Droppable droppableId="MovesList">
            {(provided) => (
                <div 
                    className="moves" 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <div className='moves__heading'>
                        Moves
                    </div>
                    {moves?.map((move, index) => (
                        <SingleAction
                            disableDelete={true}
                            index={index}
                            moves={moves}
                            move={move}
                            key={move.id}
                            setMoves={setMoves}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

        <Droppable droppableId="MovesActions">
            {(provided) => (
            <div 
                className="moves actions"
                ref={provided.innerRef} 
                {...provided.droppableProps}
            >
                <span className='moves__heading'>
                    Action
                </span>
                 {actions?.map((move, index) => (
                    <SingleAction
                        index={index}
                        moves={actions}
                        move={move}
                        key={move.id}
                        refresh={refresh}
                        setMoves={setActions}
                    />
                ))}
                {provided.placeholder}
            </div>
            )}
        </Droppable>

        {displayAddIcon && 
        <div style={{display:'flex', flexDirection:'column' ,justifyContent:'center', alignItems:'center'}}>
        <div className="icon">
            <AddBoxIcon sx={{color:'gray', cursor:'pointer'}} onClick={()=>{
                setDisplayAddIcon(!displayAddIcon);
                setSprite2(require('../Assets/images/jerry1.png'));
            }}/>
            <span class="tooltiptext">add sprite</span>
        </div>
        <div><DeleteIcon onClick={()=>{setActions([])}} sx={{cursor:'pointer', fontSize:'30px',color:'Grey'}}/></div>
        </div>
        }
        {!displayAddIcon &&
            <Droppable droppableId="MovesActions2">
                {(provided) => (
                <div 
                    className="moves actions"
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <span className='moves__heading'>
                        Action 2
                    </span>
                    {actions2?.map((move, index) => (
                        <SingleAction
                            index={index}
                            moves={actions2}
                            move={move}
                            key={move.id}
                            refresh={refresh}
                            setMoves={setActions2}
                        />
                    ))}
                    {provided.placeholder}
                    
                </div>
                )}
            </Droppable>
        }
        {!displayAddIcon &&
            <div className="icon">
                <DisabledByDefaultIcon sx={{color:'gray', cursor:'pointer'}} onClick={()=>{
                    setDisplayAddIcon(!displayAddIcon);
                    setSprite2(null);
                    refresh();
                }}/>
                <div><DeleteIcon onClick={()=>{setActions([]);setActions2([])}} sx={{cursor:'pointer', fontSize:'30px',color:'Grey'}}/></div>
            </div>
        }

        <div className="moves play" 
            style={{
             background: theme ?'url("https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/misty-forest-background1595620320482968.jpg?impolicy=prdimg&imdensity=1&imwidth=1000")':null, 
             backgroundSize:theme?'100% 100%':null
            }}
        >
            <Draggable1 bounds= {{left: -540, top: -250, right:540, bottom:250}}>
                <div style={{display:'flex', flexDirection:"row"}}> 
                    <div ref={ref} style={{
                        position:'relative',
                        transition:'1s all ease'}}
                    >
                    {hello ?
                        <div style={{transition:"0s all ease"}} className='msgPopup'>
                            hello!
                        </div>
                        : null
                    }
                    <img src={sprite} 
                        draggable='false'
                        style={{
                            cursor:"pointer",
                            position:'relative',
                            height:200, 
                            width:200,
                            transition: '1s all ease'
                        }}
                    />
                    </div>
                    {!displayAddIcon && <div ref={ref2} style={{
                        position:'relative',
                        transition:'1s all ease'}}
                    >
                    {hello2 ?
                        <div style={{transition:"0s all ease"}} className='msgPopup'>
                            hello!
                        </div>
                        : null
                    }
                    <img src={sprite2} 
                        draggable='false'
                        style={{
                            cursor:"pointer",
                            position:'relative',
                            height:200, 
                            width:200,
                            transition: '1s all ease'
                        }}
                    />
                    </div>}
                </div>
            </Draggable1>
        </div>
    </div>

    <div className="gameProps">
        <Sprites setSprite={setSprite} setSprite2={setSprite2} displayAddIcon={displayAddIcon} sprite2={sprite2} sprite={sprite} />
        
        <div className='playRefresh' >
            <Button variant="contained" sx={{borderRadius:"20px", marginRight:'5px', height:"40px", width:'80px'}}  
                color='success' onClick={runApp}
            >
                <PlayArrowIcon />
            </Button>
            <Button variant="contained" sx={{borderRadius:"20px", height:"40px", width:'80px'}} 
                color='error' onClick={refresh}
            >
                <RefreshIcon sx={{color:'white'}}/>
            </Button>
        </div>
        <Positions handleMove={moveXY} refresh={refresh} />
        <Resize setSize={handleScale} size={'small'}/>
        <Box className="backgroundButton" 
            sx={{ 
                ":hover":{ 
                    backgroundColor:'#4d97ff',
                    border:'2px solid #0d6efd',
                    cursor:'pointer'
                },
                background:theme?'#4d97ff':'white',
                border:theme?'2px solid #0d6efd':'none',
            }}
            onClick={()=>setTheme(!theme)}
            >
            <WallpaperIcon/>
        </Box>
    </div>
  </div>

  );
}
export default EventBody;