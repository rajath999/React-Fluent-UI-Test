// import React from 'react';
// import logo from './logo.svg';
import "./App.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import Fabric from "./components/fabric";
import Treeview from "./components/Treeview";
import TreeAbsorbist from "./components/TreeAbsorbist";
import AntTree from "./components/AntTree";

import '@fluentui/react/dist/css/fabric.min.css';
import 'antd/dist/reset.css';
import DayPickerComponent from "./components/DayPicker";
import MultiDnd from "./components/MultiDnd";
import Dropdown from "./components/AndD/Dropdown";

initializeIcons();

const styles = makeStyles({
  title: {
    color: "red",
    fontSize: "32px",
  },
  bold: {
    fontWeight: "bold",
    color: "green",
  },
  treeContainer: {
    width: "50rem",
    // textAlign: "left",
  },
});

function App() {
  const classes = styles();

  return (
    <div className="">
      <h1 className={mergeClasses(classes.title, classes.bold)}>
        Hello React FLUENT
      </h1>
      {process.env.NODE_ENV}

      <hr />
      <Fabric />
      {/* <FabricReact/> */}

      <div style={{margin: "0 auto"}} className={classes.treeContainer}>
        <Treeview />
      </div>

      <div style={{margin: "0 auto"}} className={classes.treeContainer}>
        {/* <TreeAbsorbist /> */}
      </div>

      <div>
        <MultiDnd />
      </div>

      <div>
        <Dropdown />
      </div>

      <hr/>
      <div>
       <hr/>
        <DayPickerComponent />
        <hr />
      </div>
      <div>
        <AntTree />
      </div>
    </div>
  );
}

export default App;
