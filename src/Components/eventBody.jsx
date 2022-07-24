import * as React from 'react';
import { SingleAction } from './singleAction';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Sprites} from './spriteProps';
import Positions from './positons';
import Resize from './resize';
import Draggable1 from 'react-draggable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { WARN_MSG_POS, WARN_MSG_SIZE } from '../constanst';

export const EventBody = (props) => {
    const {
        moves,
        setMoves,
        actions,
        setActions
    } = props;

    const ref = React.useRef();
    const refHello = React.useRef();

    let r = '0%';
    let t = '0%';
    let scale = 1;
    let angle = 0;

    const [hello, setHello] = React.useState(false);
    const [theme, setTheme] = React.useState(false);
    const [sprite, setSprite]= React.useState(require('../Assets/images/jerry1.png'));

    console.log("rendering...");

    function transform(temp, xAxis){
        let value = temp.toString();
        if(xAxis){
            r = value.concat('%')
        } else{
            t = value.concat('%')
        }
        ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`;
    }

    function callwarn(msg){
        refresh();
        toast.warn(msg,{
            position: "top-center",
            autoClose: 2000,
            borderRadius:'20px',
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }

    function moveUp (i) {
        setTimeout(()=>{
            let temp = parseInt(t.slice(0,-1));
            temp = temp - 50;
            if(temp<-140){
                callwarn(WARN_MSG_POS);
                return
            }
            transform(temp, false);
        }, (i * 1500));
    }
    function moveDown (i) {        
        setTimeout(() => {
            let temp = parseInt(t.slice(0,-1));
            temp = temp + 50;
            if(temp>140){
                callwarn(WARN_MSG_POS);
                return
            }
           transform(temp, false);
        }, (i * 1500));
    }
    function moveRight (i) {
        setTimeout(()=>{
            let temp = parseInt(r.slice(0,-1));
            temp = temp + 50;
            if(temp>290){
                callwarn(WARN_MSG_POS);
                return
            }
            transform(temp, true);
        }, (i * 1500));
    }
    function moveLeft(i) {
        setTimeout(() => {
            let temp = parseInt(r.slice(0,-1));
            temp = temp - 50;
            if(temp<-290){
                callwarn(WARN_MSG_POS);
                return
            }
            transform(temp, true);
        }, (i * 1500));
    }
    function sayHello(i){
        setTimeout(()=>{
            setHello(true);
            refHello.current.style.transform = `translate(${r}, ${t})`;
        }, (i* 1500));
        closeHello(i);
    }
    function closeHello(i){
        setTimeout(()=>{
            setHello(false);
        }, (i*1500) +1000);
    }
    function moveXY(xInput, yInput, random, i) {
        setTimeout(()=>{
            let tempR = parseInt(r.slice(0,-1));
            let tempT = parseInt(t.slice(0,-1));
            tempR = tempR !== parseInt(xInput) && parseInt(xInput) !== 0 
                ? (random ? Math.floor((Math.random() * (-290-290)) +290) : parseInt(xInput)) 
                : tempR;
            console.log(tempR)
            tempT = tempT !== (-parseInt(yInput)) && parseInt(yInput) !== 0 
                ? (random ? Math.floor((Math.random() * (-140-140)) + 140) : -parseInt(yInput)) 
                : tempT;
            if(parseInt(yInput)==0){
                tempT = 0;
            }
            if (parseInt(xInput)==0){
                tempR = 0;
            }
            if(tempR<-290 || tempR>290 || tempT<-140 || tempT>140){
                callwarn(WARN_MSG_POS);
                return
            }
            let valueR = tempR.toString();
            let valueT = tempT.toString();

            r = valueR.concat('%');
            t = valueT.concat('%');
            ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle}deg)`;
        }, (i * 1500));
    }
    const rotate = (rAngle,i) =>{
        setTimeout(() => {
            angle += rAngle;
            ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle}deg)`;
        }, (i * 1500));
    }
    function handleScale(size, increase, idx){
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
                scale += 0.2;
                if (scale<3.5){
                    ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle}deg)`;
                }else{
                    callwarn(WARN_MSG_SIZE);
                }
            }, idx*1500);
            return
        } else {
            setTimeout(() => {
                scale -= 0.2;
                if(scale>0.25){
                    ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle}deg)`;
                } else{
                    callwarn(WARN_MSG_SIZE);
                }
            }, idx*1500);
        return
        }
    }
    
    function handleTheme(){
        setTheme(!theme);
    }

    const startActions = (action, idx) =>{
        switch(action) {
            case 'move x by 10': {
                moveRight(idx);
                break;
            }
            case 'move y by 10': {
                moveUp(idx);
                break;
            }
            case 'move x by -10': {
                moveLeft(idx);
                break;
            }
            case 'move y by -10': {
                moveDown(idx);
                break;
            }
            case 'rotate 45': {
                rotate(45,idx);
                break;
            }
            case 'rotate 90': {
                rotate(90, idx);
                break;
            }
            case 'rotate 135': {
                rotate(135, idx);
                break;
            }
            case 'rotate 180': {
                rotate(180, idx);
                break;
            }
            case 'rotate 360': {
                rotate(360, idx);
                break;
            }
            case 'say hello': {
                sayHello(idx);
                break;
            }
            case 'random position': {
                moveXY(1,1,true, idx);
                break;
            }
            case 'move (0, 0)': {
                moveXY(0,0,false, idx);
                break;
            }
            case 'size decrease': {
                handleScale('', false, idx);
                break;
            }
            case 'size increase': {
                handleScale('', true, idx);
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

    const refresh = () => {
        clearTimeouts();
        r = '0%';
        t = '0%';
        scale=1;
        angle=0;
        setHello(false);
        ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle})`;
    };
    
    const runApp = () =>{
        actions && actions.map((item, i) => {startActions(item.todo, i); return});
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
                    Actions
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
        <div className="moves play" 
            style={{
             background: theme ?'url("https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/misty-forest-background1595620320482968.jpg?impolicy=prdimg&imdensity=1&imwidth=1000")':null, 
             backgroundSize:theme?'100% 100%':null
            }}>
            <Draggable1 
                bounds= {{left: -540, top: -250, right:540, bottom:250}}
            >
                <div ref={ref} style={{
                    position:'relative',
                    transition:'1s all ease'
                }}>
                    {hello ?
                        <div icon={false} severity="success" style={{transition:"0s all ease"}} className='msgPopup'>
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
            </Draggable1>
        </div>
    </div>
        <div className="gameProps">
            <Sprites setSprite={setSprite} sprite={sprite} />
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
                onClick={handleTheme}
                >
                <WallpaperIcon/>
            </Box>
        </div>
    </div>

  );
}
export default EventBody;