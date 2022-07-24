import React, { useEffect, useState } from "react";
import './styles.css';
import { Box, requirePropFactory } from "@mui/material";

export const Sprites = (props) => {
  const {sprite, setSprite, ref} = props;
  const spriteProps= [
      {
        id:0,
        src:require('../Assets/images/cat.png')
      },
      { 
        id:1,
        src: require('../Assets/images/jerry1.png')
      },
      { 
        id:2,
        src:require('../Assets/images/ball.png')
      },
      
      {
        id:3,
        src:require('../Assets/images/Mickey_Mouse.png')
      },

  ];
  function handleClick(src) {
    console.log('clicked')
    setSprite(src);
  };
  return (
    <Box 
        sx={{ 
            marginLeft:'5%',
            fontFamily:'monospace',
            display:'flex',
            maxWidth:'540px',
            flexDirection:'row',
            columnGap:'10px'
        }}
    >
        {spriteProps.map((item)=>(
            <Box
                sx={{
                    background:sprite !== item.src ?'white':'#4d97ff',
                    borderRadius:'20px',
                    border: sprite === item.src ? '2px solid #0d6efd':'2px solid transparent',
                    ":hover":{
                       backgroundColor:'#4d97ff',
                       border:'2px solid #0d6efd',
                       cursor:'pointer'
                    }
                }}
                onClick={()=>handleClick(item.src)}
            >
                <img src={item.src} 
                    style={{
                        matginBottom:'30px',
                        height:'120px',
                        width:'120px'
                    }}
                />
            </Box>
        ))}
    </Box>
  );
};

export default Sprites;