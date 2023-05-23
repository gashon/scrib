import { useEffect, useState, FC } from 'react';
import { ScribbleSVG } from '@scrib/ui/svg';

export const RandomRepeatingSVGBackground: FC = () => {
  const [SVGs, setSVGs] = useState([]);
  const svgComponents = [<ScribbleSVG />];

  useEffect(() => {
    const totalHeight = document.documentElement.scrollHeight;
    const numOfSVGs = Math.floor(totalHeight / 1000);
    const newSVGs = [];

    for (let i = 0; i < numOfSVGs; i++) {
      const SVGComponent = svgComponents[i % svgComponents.length];
      const position = i * 1000;

      newSVGs.push(
        <div
          key={`svg_background_${i}`}
          style={
            i % 2 === 0
              ? { top: position, position: 'absolute', left: 0 }
              : { top: position, position: 'absolute', right: 0 }
          }
          className="w-1/2 h-100px opacity-25"
        >
          {SVGComponent}
        </div>
      );
    }

    setSVGs(newSVGs);
  }, []);

  return <>{SVGs.map((svg) => svg)}</>;
};

export default RandomRepeatingSVGBackground;
