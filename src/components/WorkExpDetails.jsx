import React, {useEffect, useRef} from 'react';

const WorkExpDetails = ({ workExp, onKeyDown }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  if (!workExp) {
    return <div>No work experience selected</div>;
  }

  return (
      <div
          tabIndex={-1}
          ref={containerRef}
          onKeyDown={onKeyDown}
          className="font-mono p-4 rounded-lg shadow-lg focus:outline-none overflow-y-auto">
        <h3 className="text-lg font-bold mb-2 underline flex">
          <span>{workExp.title} at {workExp.company}</span>
          <span className="flex-1 text-right">{workExp.period}</span>
        </h3>
        <div className="mb-3">
          <ul className="list-disc list-inside">
            {workExp.items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <span className="italic underline">Technologies</span>
          <span className="font-normal">: {workExp.techs.join(', ')}</span>
        </div>
      </div>
  );
};

export default WorkExpDetails;
