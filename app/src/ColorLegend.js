import React from 'react';

const ColorLegend = () => {
  const colorLegendItems = [
    // { color: 'rgba(220, 218, 216, 0)', label: '-2 ' },
    { color: 'rgba(180, 223, 187, 1)', label: ' <-1 very quiet' },
    { color: 'rgba(216, 209, 224, 1)', label: ' -1~-0.5 quiet' },
    { color: 'rgba(246, 244, 198, 1)', label: ' -0.5~0 average' },
    { color: 'rgba(246, 217, 190, 1)', label: ' 0~0.5 average' },
    { color: 'rgba(158, 185, 215, 1)', label: ' 0.5~1 busy' },
    { color: 'rgba(253, 136, 194, 1)', label: ' > 1 very busy ' },
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
