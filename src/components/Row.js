import React from "react"
import PropTypes from "prop-types"
import Box from "./Box"

function Row({ row, cols, activeRow }) {
  return (
    <div className="letter-row">
      {Array(cols)
        .fill(0)
        .map((el, idx) => `row-${row}-col-${idx}`)
        .map((id) => (
          <Box active={activeRow} key={id} id={id} cols={cols} />
        ))}
    </div>
  )
}

Row.propTypes = {
  cols: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  activeRow: PropTypes.bool.isRequired,
}

export default Row
