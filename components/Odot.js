import React from "react";
import style from "../styles/About.module.css";

const About = () => {
  return (
    <div id="about" className={style.container}>
      <main className={style.main}>
        <h1> אודות </h1>
        <p>כמה פעמים הלכנו לסופר ועשינו קניות אך לא חשבנו על הצד של......</p>
      </main>
    </div>
  );
};

export default About;
