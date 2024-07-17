import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "HOST", uid: "target", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "RESPONSE TIME(ms)", uid: "responseTime"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "Active"},
  {name: "Paused", uid: "Paused"},
  {name: "Down", uid: "Down"},
];


export {columns, statusOptions};
