// created with CRA (Create React App) which is now deprecated - it installed many node_modules - need to use newer tools

import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

// React Hooks are special functions that allow to use React features like state and lifecycle methods within functional components. 

const width = 8; // width of the board
const candyColors = [ blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy ];

// useState is a React Hook that allows functional components to "remember" data between re-renders. It provides a way 
// to manage dynamic data (state) within a component and automatically updates the user interface when that data changes
// creates an array of 64 colors
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

const checkForColumnOfFour = () => {
  for (let i=0; i <= 39; i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
    const decidedColor = currentColorArrangement[i]
    const isBlank = currentColorArrangement[i] === blank
    if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreDisplay((score) => score + 4)
      columnOfFour.forEach(square => currentColorArrangement[square] = blank)
      return true
    }
  }
}

const checkForColumnOfThree = () => {
  for (let i=0; i <= 47; i++) {
    const columnOfThree = [i, i + width, i + width * 2]
    const decidedColor = currentColorArrangement[i]
    const isBlank = currentColorArrangement[i] === blank
    if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreDisplay((score) => score + 3)
      columnOfThree.forEach(square => currentColorArrangement[square] = blank)
      return true
    }
  }
}

const checkForRowOfFour = () => {
  for (let i=0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3]
    const decidedColor = currentColorArrangement[i]
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63,64]
    const isBlank = currentColorArrangement[i] === blank
    if (notValid.includes(i)) continue
    if ( rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreDisplay((score) => score + 4)
      rowOfFour.forEach(square => currentColorArrangement[square] = blank)
      return true
    }
  }
}


const checkForRowOfThree = () => {
  for (let i=0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const decidedColor = currentColorArrangement[i]
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63,64]
    const isBlank = currentColorArrangement[i] === blank
    if (notValid.includes(i)) continue
    if ( rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
      setScoreDisplay((score) => score + 3)
      rowOfThree.forEach(square => currentColorArrangement[square] = blank)
      return true
    }
  }
}


const moveIntoSquareBelow = () => {
  for (let i=0; i <= 55; i++) {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    const isFirstRow = firstRow.includes(i)
    if ((isFirstRow && currentColorArrangement[i]) === blank) {
      let randomNumber = Math.floor(Math.random() * candyColors.length)
      currentColorArrangement[i] = candyColors[randomNumber]
    }
    if ((currentColorArrangement[i + width]) === blank) {
      currentColorArrangement[i + width] = currentColorArrangement[i]
      currentColorArrangement[i] = blank
    }
  }
}

console.log(scoreDisplay)

const dragStart = (e) => {
  setSquareBeingDragged(e.target)
}

const dragDrop = (e) => {
  setSquareBeingReplaced(e.target)
}

const dragEnd = () => {
  const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
  const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

  currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
  currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

  const validMoves = [
    squareBeingDraggedId -1,
    squareBeingDraggedId - width,
    squareBeingDraggedId +1,
    squareBeingDraggedId + width
  ]

  const validMove = validMoves.includes(squareBeingReplacedId)

  const isAColumnOfFour = checkForColumnOfFour()
  const isARowOfFour = checkForRowOfFour()
  const isAColumnOfThree = checkForColumnOfThree()
  const isARowOfThree = checkForRowOfThree()

  if (squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour)) {
    setSquareBeingDragged(null)
    setSquareBeingReplaced(null)
  } else {
    currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
    setCurrentColorArrangement([...currentColorArrangement])
  }
}




const createBoard = () => {
  const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor  = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
  setCurrentColorArrangement(randomColorArrangement);
}

// The useEffect hook in React lets you perform side effects (tasks outside the normal rendering flow, like data fetching, 
// subscriptions, or manual DOM updates) in functional components, after the component has rendered
useEffect(() => {
  createBoard();
}, []) // called with an empty array to perform once, and after the render (because useEffect works after the render)

useEffect(() => {
  const timer = setInterval(() => {
    checkForColumnOfFour()
    checkForRowOfFour()
    checkForColumnOfThree()
    checkForRowOfThree()
    moveIntoSquareBelow()
    setCurrentColorArrangement([...currentColorArrangement]) /// ... is a spread operator
  }, 200) // checks every 200 miliseconds
  return () => clearInterval(timer)
}, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement]);

// returns a board of 8x8 tiles with colors
  return (
    <div className="app"> 
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
          ))}
      </div>
      <ScoreBoard score={scoreDisplay}/>
    </div>
  );
}

export default App;
