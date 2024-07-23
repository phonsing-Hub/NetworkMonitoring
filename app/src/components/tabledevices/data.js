import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "DNS/IP", uid: "ip", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "POINTS", uid: "points", sortable: true},
];

const statusOptions = [
  {name: "Active", uid: "Active"},
  {name: "Paused", uid: "Paused"}
];


export {columns, statusOptions};
