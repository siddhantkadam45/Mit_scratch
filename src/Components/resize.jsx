import React from "react";
import './styles.css';
import { Box} from "@mui/material";
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const blue = {
  50: '#F0F7FF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5'
};
const tabs = ['small','medium', 'large'];
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 70%;
  padding: 5px 5px;
  margin: 2px 2px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 250px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;
export const Resize = (props) => {
    const {setSize, size} = props;
  return (
    <Box className='spriteContainer'
        sx={{
            padding:'10px',
            flexGrow: 1, 
            fontFamily:'monospace',
            height:'80px',
            maxWidth:'350px',
            background:'white',
            borderRadius:'20px',
            
        }}
    >
        <span style={{color:'grey', fontFamily:'monospace', fontSize:"13px"}}>Resize</span>
        <Box sx={{
            padding:'10px',
            display:'flex',
            flexDirection:'row',
            columnGap:'20px',
            justifyContent:'center',
            alignItems:"center"
        }}>
            
            <TabsUnstyled defaultValue={tabs.indexOf(size)}>
                <TabsList>
                    {tabs.map((item)=>(
                        <Tab onClick={()=>setSize(item)}>{item}</Tab>
                    ))}
                </TabsList>
            </TabsUnstyled> 
        </Box>
    </Box>
  );
};

export default Resize;