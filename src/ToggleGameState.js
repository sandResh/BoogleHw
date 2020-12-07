import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './game_state_enum.js';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import './ToggleGameState.css';

function ToggleGameState({gameState, setGameState, setSize, setTotalTime}) {

  const [buttonText, setButtonText] = useState("Start Boggle Game");
  const [startTime, setStartTime] = useState(0);
  let deltaTime;
  let tempTime;

  function updateGameState(endTime) {
    
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setStartTime(Date.now());
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
       tempTime = (endTime - startTime)/ 1000.0;
       deltaTime = tempTime % 60;
      setTotalTime(deltaTime); 
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start");
    }
  }
  
  const handleChange = (event) => {
    setSize(event.target.value);
  };
  
  return (
    <div className="Toggle-game-state">
      <Button  variant="outlined" onClick={() => updateGameState(Date.now())} >
        {buttonText}
      </Button>

      { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED)  &&
        <div className="Input-select-size">
        <FormControl >
       
        <Select
          labelId="sizelabel"
          id="sizemenu"
        
       
          onChange={handleChange}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
         <FormHelperText>Select boggle size</FormHelperText>
        </FormControl>
       </div>
      }
    </div>
  );
}

export default ToggleGameState;
