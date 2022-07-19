import React from "react";
import style from "../styles/SumSupers.module.css";

function SumSupers({ sum }) {
  return <div className={style.superSum}>{sum()}</div>;
}

export default SumSupers;
