import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function Dice(props) {
  const faces = [
    [<div key={uuidv4()} className="dot center middle"></div>],

    [<div key={uuidv4()} className="dot top right"></div>,
    <div key={uuidv4()} className="dot bottom left"></div>],

    [<div key={uuidv4()} className="dot top right"></div>,
    <div key={uuidv4()} className="dot center middle"></div>,
    <div key={uuidv4()} className="dot bottom left"></div>],

    [<div key={uuidv4()} className="dot top left"></div>,
    <div key={uuidv4()} className="dot top right"></div>,
    <div key={uuidv4()} className="dot bottom left"></div>,
    <div key={uuidv4()} className="dot bottom right"></div>],

    [<div key={uuidv4()} className="dot top left"></div>,
    <div key={uuidv4()} className="dot top right"></div>,
    <div key={uuidv4()} className="dot center middle"></div>,
    <div key={uuidv4()} className="dot bottom left"></div>,
    <div key={uuidv4()} className="dot bottom right"></div>],

    [<div key={uuidv4()} className="dot top left"></div>,
    <div key={uuidv4()} className="dot top right"></div>,
    <div key={uuidv4()} className="dot center left"></div>,
    <div key={uuidv4()} className="dot center right"></div>,
    <div key={uuidv4()} className="dot bottom left"></div>,
    <div key={uuidv4()} className="dot bottom right"></div>],
  ]
  let face = faces[props.value - 1]
  return (
    <div onClick={props.holdDice} className={props.isHeld === true ? 'dice held' : 'dice'}>
      {face}
    </div>
  )
}

export default Dice