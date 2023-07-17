// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import { motion } from "framer-motion";



// export default function TemporaryDrawer() {
//   const [state, setState] = useState({
//     left: false,
//   });

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       ((event.key === 'Tab' ||
//         event.key === 'Shift'))
//     ) {
//       return;
//     }

//     setState({ ...state, left: open });
//   };

//   const show = {
//     opacity: 1,
//     display: "block"
//   };
  
//   const hide = {
//     opacity: 0,
//     transitionEnd: {
//       display: "none"
//     }
//   };
//   const [isVisible, setIsVisible] = useState(true);

//   const list = () => (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <h3>New York Trip</h3>


//       <Divider />
//       <div className="example">
//       <motion.div className="box" animate={isVisible ? show : hide} />
//       <div className="controls">
//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setIsVisible(!isVisible)}
//         >
//           {isVisible ? "Hide" : "Show"}
//         </motion.button>
//       </div>
//     </div>
//       <Divider />
      
//       <Box>

//       </Box>
      
//       <Divider />
      
//     </Box>
//   );

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>Toggle Trip</Button>
//       <Drawer
//         anchor="left"
//         open={state.left}
//         onClose={toggleDrawer(false)}
//       >
//         {list()}
//       </Drawer>
//     </div>
//   );
// }
import React, { useState } from 'react';

const TemporaryDrawer = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isWindowOpen, setWindowOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
    setWindowOpen(false);
  };

  const toggleWindow = () => {
    setWindowOpen(!isWindowOpen);
  };

  return (
    <div>
      <button onClick={toggleDrawer}>Drawer Button</button>
      {isDrawerOpen && (
        <div style={{ display: 'flex' }}>
          <div style={{ width: '200px', background: 'lightgray' }}>
            <button onClick={toggleWindow}>Open Window</button>
           
          </div>
          {isWindowOpen && (
            <div
              style={{
                width: '200px',
                marginLeft: '10px',
                background: 'lightblue',
              }}
            >
              Window Content
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TemporaryDrawer;




