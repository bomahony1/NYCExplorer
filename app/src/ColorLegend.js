import React from 'react';

const ColorLegend = () => {
  const colorLegendItems = [
    { color: '#ffffff', label: ' < 1 quiet' },
    { color: 'rgba(180, 223, 187, 1)', label: ' 1-2 ' },
    { color: 'rgba(216, 209, 224, 1)', label: ' 2-3' },
    { color: 'rgba(246, 244, 198, 1)', label: ' 3-4' },
    { color: 'rgba(246, 217, 190, 1)', label: ' 4-6' },
    { color: 'rgba(158, 185, 215, 1)', label: ' 6-8' },
    { color: 'rgba(253, 136, 194, 1)', label: ' > 8  busy ' },
  ];

  return (
    <div>
      {colorLegendItems.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '20px',
              height: '20px',
              marginRight: '10px',
              border: '1px solid #fff',
              backgroundColor: item.color,
            }}
          ></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorLegend;
