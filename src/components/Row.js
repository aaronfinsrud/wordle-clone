import React from "react"
import PropTypes from "prop-types"
import Box from "./Box"

function Row({ row, cols }) {
  return (
    <div className="letter-row">
      {Array(cols)
        .fill(0)
        .map((el, idx) => `row-${row}-col-${idx}`)
        .map((id) => (
          <Box key={id} cols={cols} />
        ))}
    </div>
  )
}

Row.propTypes = {
  cols: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
}

export default Row
