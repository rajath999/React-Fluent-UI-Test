// import React from 'react';
// import logo from './logo.svg';
import "./App.css";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import Fabric from "./components/fabric";
import Treeview from "./components/Treeview";
import TreeAbsorbist from "./components/TreeAbsorbist";
import AntTree from "./components/AntTree";

import "@fluentui/react/dist/css/fabric.min.css";
import "antd/dist/reset.css";
import DayPickerComponent from "./components/DayPicker";
import MultiDnd from "./components/MultiDnd";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LayoutComponent from "./components/Layout/LayoutComponent";
import DropDownAntD from "./components/AndD/Dropdown";
import AntDTree from "./components/antdtree";

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
  return (
    <BrowserRouter>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<DropDownAntD />} />
          <Route path="/day-picker" element={<DayPickerComponent />} />
          <Route path="/ant-tree" element={<AntTree />} />
          <Route path="/fabric" element={<Fabric />} />
          <Route path="/multi-dnd" element={<MultiDnd />} />
          <Route path="/tree-view" element={<Treeview />} />
          <Route path="/worker-tree" element={<AntDTree />} />
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  );
}

export default App;
