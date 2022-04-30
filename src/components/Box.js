import React from "react"
import PropTypes from "prop-types"

function Box({ id, active }) {
  return (
    <div className="letter-box">
      {active ? (
        <input
          onCompositionStart={() => () => {}}
          onCompositionEnd={() => {}}
          type="text"
          name={id}
          maxLength="1"
        />
      ) : null}
    </div>
  )
}

Box.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}

export default Box
