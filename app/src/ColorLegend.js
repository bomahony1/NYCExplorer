import React from 'react';

const ColorLegend = () => {
  const colorLegendItems = [
    // { color: 'rgba(220, 218, 216, 0)', label: '0 ' },
    { color: 'rgba(180, 223, 187, 1)', label: ' 1-50 ' },
    { color: 'rgba(216, 209, 224, 1)', label: ' 50-150 ' },
    { color: 'rgba(246, 244, 198, 1)', label: ' 151-300 ' },
    { color: 'rgba(246, 217, 190, 1)', label: ' 301-450 ' },
    { color: 'rgba(158, 185, 215, 1)', label: ' 451-600' },
    { color: 'rgba(253, 136, 194, 1)', label: ' > 600 ' },
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
