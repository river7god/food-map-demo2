import React, { useState, useEffect } from "react";

export default function FoodList({ foodList }) {
  const [gridColumns, setGridColumns] = useState(1);

  useEffect(() => {
    // Calculate the number of columns based on the number of items, to make a square grid
    const totalItems = foodList.length;
    const sqrt = Math.sqrt(totalItems);
    const cols = Math.ceil(sqrt);
    setGridColumns(cols);
  }, [foodList]);

  /**
   * tailwindcss only builds classes that are directly used in the code
   * so we need to add the grid-cols-* classes to the safelist in tailwind.config.js
   */
  return (
    <div className={`flex flex-wrap`}>
      {foodList.map((food, index) => (
        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 whitespace-normal">
 {food} |
        </span>
      ))}
    </div>
  );
}
