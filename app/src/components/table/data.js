import React from "react";
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "DEPARTMENT", uid: "department"},
  //{name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "Active"},
  {name: "Paused", uid: "Paused"},
  {name: "Vacation", uid: "Vacation"},
];


export {columns, statusOptions};
