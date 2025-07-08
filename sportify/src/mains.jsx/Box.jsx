import React from 'react';
import Box1 from './Box1';
import Box2 from './Box2';
import Box3 from './Box3';

function Box() {
  return (
    <div className="flex flex-row gap-4 absolute top-20">
      <div className="h-full w-110 bg-gray rounded-lg">
        <Box1 />
      </div>
      <div className="h-full w-10">
        <Box2 />
      </div>
      <div className="h-full w-10">
        <Box3 />
      </div>
    </div>
  );
}

export default Box;
