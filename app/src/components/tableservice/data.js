const columns = [
  { name: "ID", uid: "id", sortable: true},
  { name: "HOSTS", uid: "host"},
  { name: "STATUS", uid: "status", sortable: true },
  { name: "MESSAGE", uid: "message" },
  { name: "RESPONSE TIME", uid: "time", sortable: true },
  { name: "PRIORITY", uid: "points", sortable: true },
  //{name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "Up"},
  {name: "Down", uid: "Down"},
];


export {columns, statusOptions};
