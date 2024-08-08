import React from "react";

const LikeResponse = ({ liked, onLikeChange }) => (
  <div>
    <p>Did you like the response?</p>
    <label>
      <input
        type="radio"
        value="yes"
        checked={liked === "yes"}
        onChange={onLikeChange}
      />{" "}
      Yes
    </label>
    <label>
      <input
        type="radio"
        value="no"
        checked={liked === "no"}
        onChange={onLikeChange}
      />{" "}
      No
    </label>
  </div>
);

export default LikeResponse;
