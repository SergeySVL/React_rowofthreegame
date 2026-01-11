import { useEffect, useState } from "react";

// React Hooks are special functions that allow to use React features like state and lifecycle methods within functional components. 

const width = 8; // width of the board
const candyColors = [ 'blue', 'green', 'orange', 'purple', 'red', 'yellow' ];

// useState is a React Hook that allows functional components to "remember" data between re-renders. It provides a way 
// to manage dynamic data (state) within a component and automatically updates the user interface when that data changes
// creates an array of 64 colors
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

const checkForColumnOfFour = () => {
  for (let i=0; i <= 39; i++) {
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
    const decidedColor = currentColorArrangement[i]
    if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
      columnOfFour.forEach(square => currentColorArrangement[square] = '')
    }
  }
}

const checkForColumnOfThree = () => {
  for (let i=0; i <= 47; i++) {
    const columnOfThree = [i, i + width, i + width * 2]
    const decidedColor = currentColorArrangement[i]
    if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
      columnOfThree.forEach(square => currentColorArrangement[square] = '')
    }
  }
}

const checkForRowOfFour = () => {
  for (let i=0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i + 3]
    const decidedColor = currentColorArrangement[i]
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63,64]
    if (notValid.includes(i)) continue
    if ( rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
      rowOfFour.forEach(square => currentColorArrangement[square] = '')
    }
  }
}


const checkForRowOfThree = () => {
  for (let i=0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const decidedColor = currentColorArrangement[i]
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63,64]
    if (notValid.includes(i)) continue
    if ( rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
      rowOfThree.forEach(square => currentColorArrangement[square] = '')
    }
  }
}


const moveIntoSquareBelow = () => {
  for (let i=0; i <= 55; i++) {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    const isFirstRow = firstRow.includes(i)
    if ((isFirstRow && currentColorArrangement[i]) === '') {
      let randomNumber = Math.floor(Math.random() * candyColors.length)
      currentColorArrangement[i] = candyColors[randomNumber]
    }
    if ((currentColorArrangement[i + width]) === '') {
      currentColorArrangement[i + width] = currentColorArrangement[i]
      currentColorArrangement[i] = ''
    }
  }
}

const dragStart = (e) => {
  console.log('drag start')
}

const dragDrop = (e) => {
  console.log('drag drop')
}

const dragEnd = (e) => {
  console.log('drag end')
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
  }, 400) // checks every 400 miliseconds
  return () => clearInterval(timer)
}, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement]);

console.log(currentColorArrangement);

// returns a board of 8x8 tiles with colors
  return (
    <div className="app"> 
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDrapEnd={dragEnd}
          />
          ))}
      </div>
    </div>
  );
}

export default App;
