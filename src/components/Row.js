import React from "react"
import PropTypes from "prop-types"
import Box from "./Box"

function Row({ column }) {
  return (
    <div className="letter-row">
      {column.map((cell) => (
        <Box key={cell.id} cell={cell} />
      ))}
    </div>
  )
}

Row.propTypes = {
  column: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Row
