import './resizer.css';
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from 'react';

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizer: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    // Improve browser resize lagging
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    // Add event listener 
    window.addEventListener('resize', listener);
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  if (direction === 'vertical') {
    resizableProps = {
      minConstraints: [Infinity, 24], // User can't resize and lose frame 
      maxConstraints: [Infinity, innerHeight * 0.95], // User can't resize frame off the window
      height: 300, 
      width: Infinity,
      resizeHandles: ['s'], // Southern edge
    };
  } else {
    resizableProps = {
      // For css rule
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.25, Infinity], // User can't resize and lose frame 
      maxConstraints: [innerWidth * 0.75, Infinity], // User can't resize frame off the window
      height: Infinity, 
      width: width,
      resizeHandles: ['e'], // Eastern edge
      onResizeStop: (event, data) => {
        setWidth(data.size.width);  
      },
    };
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizer; 