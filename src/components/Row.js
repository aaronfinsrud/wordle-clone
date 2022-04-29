import Box from './Box.js';

function Row({rows, cols}) {
  return (
      <div className='letter-row'>
        {Array(cols).fill(0).map(el => <Box cols={cols}/>)}
      </div>
  );
}

export default Row;
