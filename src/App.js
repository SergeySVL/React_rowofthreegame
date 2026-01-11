import { useEffect, useState } from "react";

// React Hooks are special functions that allow to use React features like state and lifecycle methods within functional components. 

const width = 8; // width of the board
const candyColors = [ 'blue', 'green', 'orange', 'purple', 'red', 'yellow' ];

// useState is a React Hook that allows functional components to "remember" data between re-renders. It provides a way 
// to manage dynamic data (state) within a component and automatically updates the user interface when that data changes
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
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

  return (
    <div className="app"> 
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            style={{backgroundColor: candyColor}}
            />
        ))}

      </div>
    </div>
  );
}

export default App;
